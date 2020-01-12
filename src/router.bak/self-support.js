import Home from 'src/components/Home.vue';

const SELF_SUPPORT_ROUTES =  {
  path: '/self-support',
  component: Home,
  name: 'self-support',
  meta: {
    label: '自营单项'
  },
  children: [
    {
      path: 'hotel',
      component: function(resolve){
        require(['src/components/self-support/HotelList.vue'], resolve)
      },
      name: 'SelfSupportDxHotel',
      meta: {
        label: '酒店产品',
        menu: 'SelfSupportDxHotel',
        permission: 'api/selfsupport.hotel/hotelList'
      }
    },
    {
      path: 'hotel-detail',
      component: function(resolve){
        require(['src/components/self-support/HotelDetail.vue'], resolve)
      },
      name: 'SelfSupportDxHotelDetail',
      meta: {
        label: '酒店详情',
        menu: 'SelfSupportDxHotel',
        permission: 'api/selfsupport.hotel/detail'
      }
    },
    {
      path: 'hotel-add',
      component: function(resolve){
        require(['src/components/self-support/HotelEdit.vue'], resolve)
      },
      name: 'SelfSupportDxHotelAdd',
      meta: {
        label: '新增酒店',
        menu: 'SelfSupportDxHotel',
        permission: 'api/selfsupport.hotel/store'
      }
    },
    {
      path: 'hotel-edit',
      component: function(resolve){
        require(['src/components/self-support/HotelEdit.vue'], resolve)
      },
      name: 'SelfSupportDxHotelEdit',
      meta: {
        label: '编辑酒店',
        menu: 'SelfSupportDxHotel',
        permission: 'api/selfsupport.hotel/store'
      }
    },
    {
      path: 'room',
      component: function(resolve){
        require(['src/components/self-support/RoomList.vue'], resolve)
      },
      name: 'SelfSupportDxRoom',
      meta: {
        label: '房型管理',
        menu: 'SelfSupportDxRoom',
        permission: 'api/selfsupport.hotel/roomList'
      }
    },
    {
      path: 'room/add',
      component: function(resolve){
        require(['src/components/self-support/RoomEdit.vue'], resolve)
      },
      name: 'SelfSupportDxRoomAdd',
      meta: {
        label: '新增房型',
        menu: 'SelfSupportDxRoom',
        permission: 'api/selfsupport.hotel/storeRoom'
      }
    },
    {
      path: 'room/edit',
      component: function(resolve){
        require(['src/components/self-support/RoomEdit.vue'], resolve)
      },
      name: 'SelfSupportDxRoomEdit',
      meta: {
        label: '编辑房型',
        menu: 'SelfSupportDxRoom',
        permission: 'api/selfsupport.hotel/storeRoom'
      }
    },
    {
      path: 'room/detail',
      component: function(resolve){
        require(['src/components/self-support/RoomDetail.vue'], resolve)
      },
      name: 'SelfSupportDxRoomDetail',
      meta: {
        label: '房型详情',
        menu: 'SelfSupportDxRoom',
        permission: 'api/selfsupport.hotel/storeRoom'
      }
    },
    {
      path: 'room/package',
      component: function(resolve){
        require(['src/components/self-support/RoomPackageList.vue'], resolve)
      },
      name: 'SelfSupportDxRoomPackage',
      meta: {
        label: '房型套餐',
        menu: 'SelfSupportDxRoom',
        permission: 'api/selfsupport.hotel/roomPackageList'
      }
    },
    {
      path: 'room/package/add',
      component: function(resolve){
        require(['src/components/self-support/RoomPackageEdit.vue'], resolve)
      },
      name: 'SelfSupportDxRoomPackageAdd',
      meta: {
        label: '新增房型套餐',
        menu: 'SelfSupportDxRoom',
        permission: 'api/selfsupport.hotel/storeRoomPackage'
      }
    },
    {
      path: 'room/package/edith',
      component: function(resolve){
        require(['src/components/self-support/RoomPackageEdit.vue'], resolve)
      },
      name: 'SelfSupportDxRoomPackageEdit',
      meta: {
        label: '编辑房型套餐',
        menu: 'SelfSupportDxRoom',
        permission: 'api/selfsupport.hotel/storeRoomPackage'
      }
    },
    {
      path: 'room/package/detail',
      component: function(resolve){
        require(['src/components/self-support/RoomPackageDetail.vue'], resolve)
      },
      name: 'SelfSupportDxRoomPackageDetail',
      meta: {
        label: '房型套餐详情',
        menu: 'SelfSupportDxRoom',
        permission: 'api/selfsupport.hotel/roomPackageDetail'
        
      }
    },
    // 自营单项-基础信息-酒店品牌
    {
      path: 'hotel-brand/list',
      component: function (resolve) {
        require(['src/components/self-support/HotelBrandList.vue'], resolve);
      },
      name: 'SelfSupportHotelBrand',
      meta: {
        topMenuConst: 'selfSupport',
        label: '酒店品牌',
        menu: 'selfSupportBaseinfo',
        permission: 'api/selfsupport.hotel/brandList,api/selfsupport.hotel/brandDelete'
      }
    },
    // 自营单项-基础信息-酒店品牌详情
    {
      path: 'hotel-brand/detail',
      component: function (resolve) {
        require(['src/components/self-support/HotelBrandDetail.vue'], resolve);
      },
      name: 'SelfSupportHotelBrandDetail',
      meta: {
        topMenuConst: 'selfSupport',
        label: '酒店品牌详情',
        menu: 'selfSupportHotelBrandDetail',
        permission: 'api/selfsupport.hotel/brandDetail'
      }
    },
    // 自营单项-基础信息-酒店品牌编辑
    {
      path: 'hotel-brand/edit',
      component: function (resolve) {
        require(['src/components/self-support/HotelBrandEdit.vue'], resolve);
      },
      name: 'SelfSupportHotelBrandEdit',
      meta: {
        topMenuConst: 'selfSupport',
        label: '酒店品牌编辑',
        menu: 'selfSupportHotelBrandEdit',
        permission: 'api/selfsupport.hotel/brandEdit'
      }
    },
    // 自营单项-基础信息-产品标签
    {
      path: 'product-tag/list',
      component: function (resolve) {
        require(['src/components/self-support/ProductTagList.vue'], resolve);
      },
      name: 'SelfSupportProductTag',
      meta: {
        topMenuConst: 'selfSupport',
        label: '产品标签',
        menu: 'selfSupportBaseinfo',
        permission: 'api/selfsupport.tag/index,api/selfsupport.tag/delete,api/selfsupport.tag/edit'
      }
    },
    // 自营单项-景区管理
    {
      path: 'scenic/list',
      component: function (resolve) {
        require(['src/components/self-support/ScenicList.vue'], resolve);
      },
      name: 'SelfSupportScenicList',
      meta: {
        topMenuConst: 'selfSupport',
        label: '景区管理',
        btnPath: 'edit',
        btnName: '+ 新增景区',
        btnPermission: 'api/selfsupport.scenic/store',
        menu: 'selfSupportScenic',
        permission: 'api/selfsupport.scenic/index'
      }
    },
    // 自营单项-景区详情
    {
      path: 'scenic/detail',
      component: function (resolve) {
        require(['src/components/self-support/ScenicDetail.vue'], resolve);
      },
      name: 'SelfSupportScenicDetail',
      meta: {
        topMenuConst: 'selfSupport',
        label: '景区详情',
        menu: 'selfSupportScenic',
        permission: 'api/selfsupport.scenic/detail'
      }
    },
    // 自营单项-景区编辑
    {
      path: 'scenic/edit',
      component: function (resolve) {
        require(['src/components/self-support/ScenicEdit.vue'], resolve);
      },
      name: 'SelfSupportScenicEdit',
      meta: {
        topMenuConst: 'selfSupport',
        label: '景区编辑',
        menu: 'selfSupportScenic',
        permission: 'api/selfsupport.scenic/detail,api/selfsupport.scenic/store'
      }
    },
    // 自营单项-景区门票报价
    {
      path: 'scenic/quote',
      component: function (resolve) {
        require(['src/components/self-support/ScenicForTicketQuote.vue'], resolve);
      },
      name: 'SelfSupportScenicTicketQuote',
      meta: {
        topMenuConst: 'selfSupport',
        label: '景区报价',
        menu: 'selfSupportScenic',
        permission: 'api/selfsupport.scenic/detail,api/selfsupport.scenic/store'
      }
    },
    // 自营单项-景区门票报价详情
    {
      path: 'scenic/quote-detail',
      component: function (resolve) {
        require(['src/components/self-support/ScenicForTicketQuoteDetail.vue'], resolve);
      },
      name: 'SelfSupportScenicTicketQuoteDetail',
      meta: {
        topMenuConst: 'selfSupport',
        label: '景区报价详情',
        menu: 'selfSupportScenic',
        permission: 'api/selfsupport.scenic/detail,api/selfsupport.scenic/store'
      }
    },
    // 自营单项-签证产品
    {
      path: 'visa/list',
      component: function (resolve) {
        require(['src/components/self-support/VisaList.vue'], resolve);
      },
      name: 'SelfSupportVisaList',
      meta: {
        topMenuConst: 'selfSupport',
        label: '签证产品',
        menu: 'selfSupportVisaList',
        btnPath: 'add',
        btnName: '+ 新增签证',
        btnPermission: 'api/selfsupport.visa/add_visa',
        permission: 'api/selfsupport.visa/visa_list'
      }
    },
    // 自营单项-添加签证产品
    {
      path: 'visa/add',
      component: function (resolve) {
        require(['src/components/self-support/VisaEdit.vue'], resolve);
      },
      name: 'SelfSupportVisaAdd',
      meta: {
        topMenuConst: 'selfSupport',
        label: '新增签证',
        menu: 'selfSupportVisaList',
        permission: 'api/selfsupport.visa/add_visa'
      }
    },
    // 自营单项-编辑签证产品
    {
      path: 'visa/edit',
      component: function (resolve) {
        require(['src/components/self-support/VisaEdit.vue'], resolve);
      },
      name: 'SelfSupportVisaEdit',
      meta: {
        topMenuConst: 'selfSupport',
        label: '编辑签证',
        menu: 'selfSupportVisaList',
        permission: 'api/selfsupport.visa/add_visa'
      }
    },
    // 自营单项-签证产品详情
    {
      path: 'visa/detail',
      component: function (resolve) {
        require(['src/components/self-support/VisaDetail.vue'], resolve);
      },
      name: 'SelfSupportVisaDetail',
      meta: {
        topMenuConst: 'selfSupport',
        label: '签证详情',
        menu: 'selfSupportVisaList',
        permission: 'api/selfsupport.visa/visa_detail'
      }
    },
    // 自营单项-基础信息
    {
      path: 'baseInfoIndex',
      component: function (resolve) {
        require(['src/components/MultiPageIndex.vue'], resolve);
      },
      name: 'SelfSupportBaseInfoIndex',
      meta: {
        topMenuConst: 'selfSupport',
        label: '商品分类',
        menu: 'selfSupportBaseinfo',
        permission: 'api/selfsupport.hotel/brandList,api/selfsupport.tag/index,api/selfsupport.goodscate/lists',
        paths: '/self-support/hotel-brand/list,/self-support/product-tag/list,/self-support/good/list,'
      }
    },
    // 自营单项-基础信息-商品分类
    {
      path: 'good/list',
      component: function (resolve) {
        require(['src/components/self-support/GoodscateList.vue'], resolve);
      },
      name: 'SelfSupportGoodList',
      meta: {
        topMenuConst: 'selfSupport',
        label: '商品分类',
        menu: 'selfSupportBaseinfo',
        permission: 'api/selfsupport.goodscate/lists'
      }
    },
    // 自营单项-农特优产品
    {
      path: 'localProduct/list',
      component: function (resolve) {
        require(['src/components/self-support/LocalProductList.vue'], resolve);
      },
      name: 'SelfSupportLocalProductList',
      meta: {
        topMenuConst: 'selfSupport',
        label: '农特优产品',
        menu: 'selfSupportLocalProductList',
        permission: 'api/selfsupport.localproduct/lists',
        btnPath: 'add',
        btnName: '+ 新增商品',
        btnPermission: 'api/selfsupport.localproduct/submit_create'
      }
    },
    // 自营单项-农特优产品-新增
    {
      path: 'localProduct/add',
      component: function (resolve) {
        require(['src/components/self-support/LocalProductEdit.vue'], resolve);
      },
      name: 'SelfSupportLocalProductEdit',
      meta: {
        topMenuConst: 'selfSupport',
        label: '农特优产品',
        menu: 'selfSupportLocalProductList',
        permission: 'api/selfsupport.localproduct/submit_create'
      }
    },
    // 自营单项-农特优产品-详情
    {
      path: 'localProduct/detail',
      component: function (resolve) {
        require(['src/components/self-support/LocalProductDetail.vue'], resolve);
      },
      name: 'SelfSupportLocalProductDetail',
      meta: {
        topMenuConst: 'selfSupport',
        label: '农特优产品',
        menu: 'selfSupportLocalProductList',
        permission: 'api/selfsupport.localproduct/detail'
      }
    },
  ]
};

export default SELF_SUPPORT_ROUTES;