import Home from 'src/components/Home.vue';

const WECHART_ROUTES =  {
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
        require(['src/components/wechat/bind/index.vue'], resolve);
      },
      meta: {
        label: '授信管理',
        menu: 'WechatBind',
        permission: 'api/wechat',
        paths: ''
      }
    },
    {
      path: 'bind/mini-step1',
      name: 'WechatMiniStep1',
      component: function (resolve) {
        require(['src/components/wechat/bind/MiniStep1.vue'], resolve);
      },
      meta: {
        label: '授信管理',
        menu: 'WechatBind',
        permission: 'api/wechat',
        paths: ''
      }
    },
    {
      path: 'bind/mini-step2',
      name: 'WechatMiniStep2',
      component: function (resolve) {
        require(['src/components/wechat/bind/MiniStep2.vue'], resolve);
      },
      meta: {
        label: '授信管理',
        menu: 'WechatBind',
        permission: 'api/wechat',
        paths: ''
      }
    },
    {
      path: 'bind/mini-step3',
      name: 'WechatMiniStep3',
      component: function (resolve) {
        require(['src/components/wechat/bind/MiniStep3.vue'], resolve);
      },
      meta: {
        label: '授信管理',
        menu: 'WechatBind',
        permission: 'api/wechat',
        paths: ''
      }
    },
    {
      path: 'bind/company-step1',
      name: 'WechatCompanyStep1',
      component: function (resolve) {
        require(['src/components/wechat/bind/CompanyStep1.vue'], resolve);
      },
      meta: {
        label: '授信管理',
        menu: 'WechatBind',
        permission: 'api/wechat',
        paths: ''
      }
    },
    {
      path: 'bind/company-step2',
      name: 'WechatCompanyStep2',
      component: function (resolve) {
        require(['src/components/wechat/bind/CompanyStep2.vue'], resolve);
      },
      meta: {
        label: '授信管理',
        menu: 'WechatBind',
        permission: 'api/wechat',
        paths: ''
      }
    },
    {
      path: 'bind/company-step3',
      name: 'WechatCompanyStep3',
      component: function (resolve) {
        require(['src/components/wechat/bind/CompanyStep3.vue'], resolve);
      },
      meta: {
        label: '授信管理',
        menu: 'WechatBind',
        permission: 'api/wechat',
        paths: ''
      }
    },
    {
      path: 'bind/company-step4',
      name: 'WechatCompanyStep4',
      component: function (resolve) {
        require(['src/components/wechat/bind/CompanyStep4.vue'], resolve);
      },
      meta: {
        label: '授信管理',
        menu: 'WechatBind',
        permission: 'api/wechat',
        paths: ''
      }
    },
    {
      path: 'name-card',
      name: 'WechatNameCard',
      component: function (resolve) {
        require(['src/components/wechat/NameCard.vue'], resolve);
      },
      meta: {
        label: '默认名片',
        menu: 'WechatNameCard',
        permission: 'api/wechat',
        paths: ''
      }
    },
    {
      path: 'commission',
      name: 'WechatCommission',
      component: function (resolve) {
        require(['src/components/wechat/Commission.vue'], resolve);
      },
      meta: {
        label: '功能设置',
        menu: 'WechatCommission',
        permission: 'api/wechat',
        paths: ''
      }
    },
    {
      path: 'fun-setting',
      name: 'WechatFunSetting',
      component: function (resolve) {
        require(['src/components/wechat/FunSetting.vue'], resolve);
      },
      meta: {
        label: '功能设置',
        menu: 'WechatFunSetting',
        permission: 'api/wechat',
        paths: ''
      }
    },
    {
      path: 'work-link',
      name: 'WechatWorkLink',
      component: function (resolve) {
        require(['src/components/wechat/WorkLink.vue'], resolve);
      },
      meta: {
        label: '工作交接',
        menu: 'WechatWorkLink',
        permission: 'api/wechat',
        paths: ''
      }
    },
    {
      path: 'manager-words',
      name: 'WechatManagerWrods',
      component: function (resolve) {
        require(['src/components/wechat/ManagerWrods.vue'], resolve);
      },
      meta: {
        label: '话术管理',
        menu: 'WechatManagerWrods',
        permission: 'api/wechat',
        paths: ''
      }
    },
    {
      path: 'shop-setting',
      name: 'WechatShop',
      component: function (resolve) {
        require(['src/components/wechat/ShopSetting.vue'], resolve);
      },
      meta: {
        label: '商城设置',
        menu: 'WechatShop',
        permission: 'api/wechat',
        paths: ''
      }
    },
    {
      path: 'pay-setting',
      name: 'WechatPay',
      component: function (resolve) {
        require(['src/components/wechat/PaySetting.vue'], resolve);
      },
      meta: {
        label: '支付设置',
        menu: 'WechatPay',
        permission: 'api/wechat',
        paths: ''
      }
    },
    {
      path: 'distribution-setting',
      name: 'WechatDistribution',
      component: function (resolve) {
        require(['src/components/wechat/DistributionSetting.vue'], resolve);
      },
      meta: {
        label: '分销设置',
        menu: 'WechatDistribution',
        permission: 'api/wechat',
        paths: ''
      }
    },
  ]
};

export default WECHART_ROUTES;