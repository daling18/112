import Home from "src/layouts/";

const HOTEL = {
  path: "/hotel",
  component: Home,
  name: "hotel",
  meta: {
    label: "酒店产品"
  },
  children: [
    {
      path: "hotelIndex",
      name: "hotelIndex",
      component: function(resolve) {
        require(["src/components/MultiPageIndex.vue"], resolve);
      },
      meta: {
        label: "酒店管理",
        menu: "Hotelmanage",
        permission: "hotel/hotelList,",
        paths: "/hotel/hotelList"
      }
    },
    {
      path: "hotelList",
      name: "HotelList",
      component: function(resolve) {
        require(["src/pages/hotel/HotelList.vue"], resolve);
      },
      meta: {
        label: "酒店管理",
        menu: "Hotelmanage",
        permission: "hotel/hotelList",
        paths:
          "/hotel/hotelList,/hotel/addHotel,/hotel/HotelEdit,/hotel/hotelFacilities,/hotel/hotelDetail,/hotel/hotelGraphic,/hotel/hotelpic,/hotel/roomtTypePic,hotel/roomtypeEdit"
      }
    },
    {
      path: "hotelEdit",
      name: "HotelEdit",
      component: function(resolve) {
        require(["src/pages/hotel/HotelEdit.vue"], resolve);
      },
      meta: {
        topMenuConst: "hotel",
        label: "编辑酒店",
        parent_label: "酒店管理",
        parent_path: "/hotel/hotelList",
        menu: "Hotelmanage",
        permission: "hotel/hotelEdit"
      }
    },
    {
      path: "hotelFacilities",
      name: "HotelFacilities",
      component: function(resolve) {
        require(["src/pages/hotel/HotelFacilities.vue"], resolve);
      },
      meta: {
        topMenuConst: "hotel",
        label: "酒店设施",
        parent_label: "酒店管理",
        parent_path: "/hotel/hotelList",
        menu: "Hotelmanage",
        permission: "hotel/hotelFacilities"
      }
    },
    {
      path: "hotelDetail",
      name: "HotelDetail",
      component: function(resolve) {
        require(["src/pages/hotel/HotelDetail.vue"], resolve);
      },
      meta: {
        topMenuConst: "hotel",
        label: "酒店详情",
        parent_label: "酒店管理",
        parent_path: "/hotel/hotelList",
        menu: "Hotelmanage",
        permission: "hotel/hotelDetail"
      }
    },
    {
      path: "hotelGraphic",
      name: "HotelGraphic",
      component: function(resolve) {
        require(["src/pages/hotel/HotelGraphic.vue"], resolve);
      },
      meta: {
        topMenuConst: "hotel",
        label: "图文详情",
        parent_label: "酒店管理",
        parent_path: "/hotel/hotelList",
        menu: "Hotelmanage",
        permission: "hotel/hotelGraphic"
      }
    },
    {
      path: "hotelpic",
      name: "Hotelpic",
      component: function(resolve) {
        require(["src/pages/hotel/Hotelpic.vue"], resolve);
      },
      meta: {
        label: "酒店图片",
        parent_label: "酒店管理",
        parent_path: "/hotel/hotelList",
        menu: "Hotelmanage",
        permission: "hotel/hotelpic"
      }
    },
    {
      path: "roomtStatus",
      name: "RoomtStatus",
      component: function(resolve) {
        require(["src/pages/hotel/RoomStatus.vue"], resolve);
      },
      meta: {
        topMenuConst: "hotel",
        label: "房态管理",
        parent_label: "酒店管理",
        parent_path: "/hotel/hotelList",
        menu: "Hotelmanage",
        permission: "hotel/roomtStatus"
      }
    },
    {
      path: "BatchPriceEdit",
      name: "BatchPriceEdit",
      component: function(resolve) {
        require(["src/pages/hotel/BatchPriceEdit.vue"], resolve);
      },
      meta: {
        topMenuConst: "hotel",
        label: "房态管理",
        parent_label: "酒店管理",
        parent_path: "/hotel/hotelList",
        menu: "Hotelmanage",
        permission: "hotel/batchPriceEdit"
      }
    },
    {
      path: "hotelroomtypeEdit",
      name: "hotelroomtypeEdit",
      component: function(resolve) {
        require(["src/pages/hotel/RoomTypeEdit.vue"], resolve);
      },
      meta: {
        topMenuConst: "hotel",
        label: "基本信息",
        parent_label: "酒店管理",
        parent_path: "/hotel/hotelList",
        menu: "Hotelmanage",
        permission: "hotel/roomtypeEdit"
      }
    },
    {
      path: "roomtTypePic",
      name: "RoomtTypePic",
      component: function(resolve) {
        require(["src/pages/hotel/RoomTypePic.vue"], resolve);
      },
      meta: {
        topMenuConst: "hotel",
        label: "房型图片",
        parent_label: "酒店管理",
        parent_path: "/hotel/roomtStatus",
        menu: "Hotelmanage",
        permission: "hotel/roomtTypePic"
      }
    },
    {
      path: "roomtPackageEdit",
      name: "RoomtPackageEdit",
      component: function(resolve) {
        require(["src/pages/hotel/RoomPackageEdit.vue"], resolve);
      },
      meta: {
        topMenuConst: "hotel",
        label: "套餐信息",
        parent_label: "酒店管理",
        parent_path: "/hotel/roomtStatus",
        menu: "Hotelmanage",
        permission: "hotel/roomtPackageEdit"
      }
    },
    {
      path: "packagePrice",
      name: "PackagePrice",
      component: function(resolve) {
        require(["src/pages/hotel/PackagePrice.vue"], resolve);
      },
      meta: {
        topMenuConst: "hotel",
        label: "套餐报价",
        parent_label: "酒店管理",
        parent_path: "/hotel/roomtPackageEdit/roomtStatus",
        menu: "Hotelmanage",
        permission: "hotel/packagePrice"
      }
    },
    {
      path: "roomIndex",
      name: "roomIndex",
      component: function(resolve) {
        require(["src/components/MultiPageIndex.vue"], resolve);
      },
      meta: {
        label: "房型管理",
        menu: "HotelroomsType",
        permission: "hotel/hotelroomsTypeList,hotel/roomtTypePic",
        paths: "/hotel/hotelroomsTypeList"
      }
    },
    {
      path: "hotelroomsTypeList",
      name: "HotelRoomTypeList",
      component: function(resolve) {
        require(["src/pages/hotel/HotelRoomTypeList.vue"], resolve);
      },
      meta: {
        topMenuConst: "hotel",
        label: "房型管理",
        menu: "HotelroomsType",
        permission: "hotel/hotelroomsTypeList",
        paths: "/hotel/hotelroomsTypeList,"
      }
    },

    {
      path: "roomtypeEdit",
      name: "RoomtypeEdit",
      component: function(resolve) {
        require(["src/pages/hotel/RoomTypeEdit.vue"], resolve);
      },
      meta: {
        topMenuConst: "hotel",
        label: "基本信息",
        parent_label: "房型管理",
        parent_path: "/hotel/roomtypeEdit",
        menu: "HotelroomsType",
        permission: "hotel/roomtypeEdit"
      }
    },
    //合库管理
    {
      path: "hotelMergeList",
      name: "hotelMergeList",
      component: function(resolve) {
        require(["src/pages/hotel/hotelMergeList.vue"], resolve);
      },
      meta: {
        label: "合库管理",
        menu: "hotelMergeList",
        permission: "hotel/hotelMergeList",
        paths: "/hotel/hotelMergeList,"
      }
    }
  ]
};

export default HOTEL;
