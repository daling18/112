"use strict";

import Vue from 'vue';
import axios from 'axios';
import Qs from 'qs';
import {
  Loading,
  Message,
  Alert
} from 'element-ui';

import store from '../store';
import {
  LOADING_VISIBLE
} from 'src/configuration/mutation-types';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseUrl: '/api/v1/',
  timeout: 60 * 1000 // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);
_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    // loadingInstance && loadingInstance.close();

    let {
      code,
      msg,
      data
    } = response.data;

    if (code == 10000) {
      window.location.href = data;
      return;
    }

    if (code === 403) {
      Alert(msg, '提示', {
        confirmButtonText: '确定',
        type: 'error'
      })
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return response.data;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
let counter = 0;
var request = (options, showLoading = false) => {
  let isUsernameChange = window.$username && (window.$username != localStorage.getItem('username'));
  let loadingInstance = null;

  if (isUsernameChange) {
    Message({
      message: '登录用户发生变化',
      type: "warning",
      duration: 1500,
      showClose: true,
      onClose() {
        window.location.reload();
      }
    })
    return;
  }
  counter++
  // loadingInstance = showLoading ? Loading.service({
  //   fullscreen: true
  // }) : null;
  store.commit(LOADING_VISIBLE, showLoading);
  // 表单传值参数格式化
  return _axios({
    url: config.baseUrl + options.url,
    method: options.method,
    data: options.params
    // params: options.params
  }).finally(() => {
    counter--;
    if (counter <= 0) {
      counter = 0;
      store.commit(LOADING_VISIBLE, false);
    }

    // loadingInstance && loadingInstance.close()
  }).then(response => {
    return response
  }, err => {
    // Toast.failed(err.messge)
    throw err
  }).catch((error) => {
    Message.error('服务器请求失败');
    throw error
  })
}


// http请求方式
export const http = {}
const methods = ['get', 'post', 'put', 'delete']
methods.forEach(method => {
  http[method] = (url, data = {}, showLoading = true) => {
    let params = {
      data
    }
    if (method === 'get') {
      return request({
        url,
        data,
        method,
      }, showLoading)
    }
    return request({
      url,
      params,
      method
    }, showLoading)
  }
})

export default http;
