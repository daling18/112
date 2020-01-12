import Vue from 'vue'
import Vuex from 'vuex'
import {
  USER_INFO,
  LOADING_VISIBLE
} from 'src/configuration/mutation-types';

import uploadImage from './module/uploadImage'
import {
  loginOut,
  getUserName,
  wxacode
} from 'src/api/api';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    [LOADING_VISIBLE]: false
  },
  getters: {
    userInfo({
      userInfo
    }, getters) {
      return userInfo;
    }
  },
  mutations: {
    [USER_INFO](state, info) {
      state.userInfo = info;
    },
    [LOADING_VISIBLE](state, visible = false) {
      state[LOADING_VISIBLE] = visible;
    }
  },
  actions: {
    async [USER_INFO]({
      commit
    }) {
      let res = await getUserName();
      let {
        code,
        data,
        msg
      } = res.data;
      if (code !== 0) {
        return Promise.reject(data);
      }
      commit(USER_INFO, data);
      return Promise.resolve(data);
      // commit(USER_INFO, )
    }
  },
  modules: {
    uploadImage
  }
})
