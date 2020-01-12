import Home from 'src/layouts/';

const WECHARTAPP_ROUTES =  {
  path: '/wechat',
  component: Home,
  name: 'wechat',
  meta: {
    label: '微信小程序'
  },
  children: [
    {
      path: 'bind/index',
      name: 'Wechat',
      component: function (resolve) {
        require(['src/pages/wechatapp/bind/index.vue'], resolve);
      },
      meta: {
        label: '授信管理',
        menu: 'WechatBind',
        permission: 'wechatapp',
        paths: ''
      }
    },
    {
      path: 'bind/mini-step1',
      name: 'WechatMiniStep1',
      component: function (resolve) {
        require(['src/pages/wechatapp/bind/MiniStep1.vue'], resolve);
      },
      meta: {
        label: '授信管理',
        menu: 'WechatBind',
        permission: 'wechatapp',
        paths: ''
      }
    },
    {
      path: 'bind/mini-step2',
      name: 'WechatMiniStep2',
      component: function (resolve) {
        require(['src/pages/wechatapp/bind/MiniStep2.vue'], resolve);
      },
      meta: {
        label: '授信管理',
        menu: 'WechatBind',
        permission: 'wechatapp',
        paths: ''
      }
    },
    {
      path: 'bind/mini-step3',
      name: 'WechatMiniStep3',
      component: function (resolve) {
        require(['src/pages/wechatapp/bind/MiniStep3.vue'], resolve);
      },
      meta: {
        label: '授信管理',
        menu: 'WechatBind',
        permission: 'wechatapp',
        paths: ''
      }
    },
    {
      path: 'bind/company-step1',
      name: 'WechatCompanyStep1',
      component: function (resolve) {
        require(['src/pages/wechatapp/bind/CompanyStep1.vue'], resolve);
      },
      meta: {
        label: '授信管理',
        menu: 'WechatBind',
        permission: 'wechatapp',
        paths: ''
      }
    },
    {
      path: 'bind/company-step2',
      name: 'WechatCompanyStep2',
      component: function (resolve) {
        require(['src/pages/wechatapp/bind/CompanyStep2.vue'], resolve);
      },
      meta: {
        label: '授信管理',
        menu: 'WechatBind',
        permission: 'wechatapp',
        paths: ''
      }
    },
    {
      path: 'bind/company-step3',
      name: 'WechatCompanyStep3',
      component: function (resolve) {
        require(['src/pages/wechatapp/bind/CompanyStep3.vue'], resolve);
      },
      meta: {
        label: '授信管理',
        menu: 'WechatBind',
        permission: 'wechatapp',
        paths: ''
      }
    },
    {
      path: 'bind/company-step4',
      name: 'WechatCompanyStep4',
      component: function (resolve) {
        require(['src/pages/wechatapp/bind/CompanyStep4.vue'], resolve);
      },
      meta: {
        label: '授信管理',
        menu: 'WechatBind',
        permission: 'wechatapp',
        paths: ''
      }
    },
    {
      path: 'name-card',
      name: 'WechatNameCard',
      component: function (resolve) {
        require(['src/pages/wechatapp/NameCard.vue'], resolve);
      },
      meta: {
        label: '默认名片',
        menu: 'WechatNameCard',
        permission: 'wechatapp',
        paths: ''
      }
    },
    {
      path: 'commission',
      name: 'WechatCommission',
      component: function (resolve) {
        require(['src/pages/wechatapp/Commission.vue'], resolve);
      },
      meta: {
        label: '功能设置',
        menu: 'WechatCommission',
        permission: 'wechatapp',
        paths: ''
      }
    },
    {
      path: 'fun-setting',
      name: 'WechatFunSetting',
      component: function (resolve) {
        require(['src/pages/wechatapp/FunSetting.vue'], resolve);
      },
      meta: {
        label: '功能设置',
        menu: 'WechatFunSetting',
        permission: 'wechatapp',
        paths: ''
      }
    },
    {
      path: 'work-link',
      name: 'WechatWorkLink',
      component: function (resolve) {
        require(['src/pages/wechatapp/WorkLink.vue'], resolve);
      },
      meta: {
        label: '工作交接',
        menu: 'WechatWorkLink',
        permission: 'wechatapp',
        paths: ''
      }
    },
    {
      path: 'manager-words',
      name: 'WechatManagerWrods',
      component: function (resolve) {
        require(['src/pages/wechatapp/ManagerWrods.vue'], resolve);
      },
      meta: {
        label: '话术管理',
        menu: 'WechatManagerWrods',
        permission: 'wechatapp',
        paths: ''
      }
    },
    {
      path: 'shop-setting',
      name: 'WechatShop',
      component: function (resolve) {
        require(['src/pages/wechatapp/ShopSetting.vue'], resolve);
      },
      meta: {
        label: '商城设置',
        menu: 'WechatShop',
        permission: 'wechatapp',
        paths: ''
      }
    },
    {
      path: 'pay-setting',
      name: 'WechatPay',
      component: function (resolve) {
        require(['src/pages/wechatapp/PaySetting.vue'], resolve);
      },
      meta: {
        label: '支付设置',
        menu: 'WechatPay',
        permission: 'wechatapp',
        paths: ''
      }
    },
    {
      path: 'distribution-setting',
      name: 'WechatDistribution',
      component: function (resolve) {
        require(['src/pages/wechatapp/DistributionSetting.vue'], resolve);
      },
      meta: {
        label: '分销设置',
        menu: 'WechatDistribution',
        permission: 'wechatapp',
        paths: ''
      }
    },
  ]
};

export default WECHARTAPP_ROUTES;