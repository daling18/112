// 旅游资源数据
import Home from 'src/layouts/';
const TRAVELDATA_ROUTE = {
  path: '/traveldata',
  component: Home,
  name: 'traveldata',
  meta: {
    label: '旅游资源数据'
  },
  children: [
    // 图片管理
    {
      path: 'picture-list',
      name: 'pirctureList',
      component: function (resolve) {
        require(['src/pages/traveldata/PictureManagementList.vue'], resolve);
      },
      meta: {
        label: '图片管理',
        menu: 'TraveldataPhotoalbum',
        permission: 'traveldata/photoalbum'
      }
    },
    // 图片管理-图片
    {
      path: 'picture-detail',
      name: 'pirctureDetail',
      component: function (resolve) {
        require(['src/pages/traveldata/PictureManagementDetail.vue'], resolve);
      },
      meta: {
        label: '相册',
        menu: 'TraveldataPhotoalbum',
        parent_label: '图片管理',
        parent_path: '/traveldata/picture-list',
        permission: 'api/photoalbum/get_photoalbum_sub_list'
      }
    },
    // 图片管理-视觉中国
    {
      path: 'visionChina',
      name: 'visionChina',
      component: function (resolve) {
        require(['src/pages/traveldata/VisionChinaManagement.vue'], resolve);
      },
      meta: {
        label: '视觉中国图片',
        menu: 'TraveldataPhotoalbum',
        parent_label: '图片管理',
        parent_path: '/traveldata/picture-list',
        permission: 'traveldata/photoalbum/vcgimages'
      }
    },
    // 图片管理-视觉中国图片详情
    {
      path: 'visionChinaDetail',
      component: function (resolve) {
        require(['src/pages/traveldata/VisionChinaManagementDetail.vue'], resolve);
      },
      name: 'visionChinaDetail',
      meta: {
        label: '视觉中国图片详情',
        menu: 'TraveldataPhotoalbum',
        parent_label: '图片管理',
        parent_path: '/traveldata/picture-list',
        permission: 'traveldata/photoalbum/vcgimages'
      }
    },
    // 酒店品牌
    {
      path: 'hotel-brand/list',
      component: function (resolve) {
        require(['src/pages/traveldata/HotelBrandList.vue'], resolve);
      },
      name: 'SelfSupportHotelBrand',
      meta: {
        topMenuConst: 'traveldata',
        label: '酒店品牌',
        menu: 'TraveldataHotel',
        permission: 'traveldata/hotel'
      }
    },
    // 酒店品牌详情
    {
      path: 'hotel-brand/detail',
      component: function (resolve) {
        require(['src/pages/traveldata/HotelBrandDetail.vue'], resolve);
      },
      name: 'SelfSupportHotelBrandDetail',
      meta: {
        label: '酒店品牌详情',
        menu: 'TraveldataHotel',
        permission: 'traveldata/hotel/branddetail'
      }
    },
    // 酒店品牌编辑
    {
      path: 'hotel-brand/edit',
      component: function (resolve) {
        require(['src/pages/traveldata/HotelBrandEdit.vue'], resolve);
      },
      name: 'SelfSupportHotelBrandEdit',
      meta: {
        label: '酒店品牌编辑',
        menu: 'TraveldataHotel',
        permission: 'traveldata/hotel/brandadd'
      }
    },
    // 产品标签
    {
      path: 'product-tag/list',
      component: function (resolve) {
        require(['src/pages/traveldata/ProductTagList.vue'], resolve);
      },
      name: 'SelfSupportProductTag',
      meta: {
        label: '产品标签',
        menu: 'TraveldataTag',
        permission: 'traveldata/tag,traveldata/tag/list'
      }
    },
    // 商品分类
    {
      path: 'good/list',
      component: function (resolve) {
        require(['src/pages/traveldata/GoodscateList.vue'], resolve);
      },
      name: 'SelfSupportGoodList',
      meta: {
        topMenuConst: 'selfSupport',
        label: '商品分类',
        menu: 'TraveldataGoodscate',
        permission: 'traveldata/goodscate'
      }
    },
  ]
};
export default TRAVELDATA_ROUTE;
