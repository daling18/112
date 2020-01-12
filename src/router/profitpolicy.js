import Home from 'src/layouts/';

const Fenrun = {
  path: '/policy',
  component: Home,
  name: 'Policy',
  meta: {
    label: '政策设置'
  },
  children:[{
    path: 'policyIndex',
    name: 'policyIndex',
    component: function (resolve) {
      require(['src/components/MultiPageIndex.vue'], resolve);
    },
    meta: {
      label: '政策设置',
      menu: 'HotelPolicy',
      permission: 'Policy',
      paths: '/policy/profitSetting'
    }
  },
  {
    path: 'profitSetting',
    name: 'profitSetting',
    component: function (resolve) {
      require(['src/pages/policy/HotelProfitSetting.vue'], resolve);
    },
    meta: {
      label: '酒店分润政策设置',
      menu: 'HotelPolicy',
      topMenuConst: 'Policy',
      permission: 'policy/profitSetting',
      paths: '/policy/profitSetting'
    }
  },
  {
    path: 'line-profitSetting',
    name: 'line-profitSetting',
    component: function (resolve) {
      require(['src/pages/policy/LineProfitSetting.vue'], resolve);
    },
    meta: {
      label: '线路分润政策设置',
      menu: 'LinePolicy',
      topMenuConst: 'Policy',
      permission: 'policy/lineProfitSetting',
      paths: '/policy/line-profitSetting,'
    }
  },
  {
    path: 'line-product',
    name: 'line-product',
    component: function (resolve) {
      require(['src/pages/policy/LineProduct.vue'], resolve);
    },
    meta: {
      label: '线路分润政策设置',
      menu: 'LinePolicy',
      topMenuConst: 'Policy',
      permission: 'policy/lineProduct',
    }
  },
  {
    path: 'product-tuanqi',
    name: 'product-tuanqi',
    component: function (resolve) {
      require(['src/pages/policy/LineProductTuan.vue'], resolve);
    },
    meta: {
      label: '线路分润政策设置',
      menu: 'LinePolicy',
      topMenuConst: 'Policy',
      permission: 'policy/productTuanqi',
    }
  },
  ]
}

export default Fenrun;