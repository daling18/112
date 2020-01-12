import Vue from 'vue';
// import './plugins/axios';
import App from './App.vue';
import {
  router
} from './router';
import store from './store/';
import VueLogger from 'vuejs-logger';

import './plugins/element.js';

import 'src/assets/css/element-variables.scss';
import 'font-awesome/css/font-awesome.min.css';
import 'src/assets/css/index.less';
import 'src/assets/css/layout.scss';

import routerPermission from './permission';


/**全局指令 */
import 'src/directives'

const isProduction = process.env.NODE_ENV === 'production';

const general_purpose_pages = [
  '/passwd'
];


Vue.config.productionTip = false;

// function routerPermission(apiNames) {
//   // console.log(process.env.NODE_ENV,'==process.env.NODE_ENV');

//   if (!isProduction) {
//     return true;
//   }

//   let permission = false;
//   let permissions = JSON.parse(window.permission);

//   apiNames = apiNames ? apiNames.split(',') : [];
//   for (let i = 0; i < apiNames.length; i++) {
//     if (permissions[apiNames[i]]) {
//       permission = true;
//       break;
//     }
//   }

//   return permission;
// }

Vue.prototype.$menuPermission = routerPermission;
Vue.config.devtools = !isProduction;

const options = {
  isEnabled: true,
  logLevel: isProduction ? 'error' : 'debug',
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: '|',
  showConsoleColors: true
};
Vue.use(VueLogger, options);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
