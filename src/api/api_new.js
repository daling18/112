import axios from "axios";
import Qs from "qs";
import { Loading, Message } from "element-ui";
// let baseUrl = '/bom'//测试环境+开发环境

let baseUrl = "/api"; //正式环境

console.log(baseUrl, "img");

console.log("test YK_ENV: ", process.env.VUE_APP_ENV);
console.log("test NODE_ENV: ", process.env.NODE_ENV);

// if (process.env.NODE_ENV === 'development') {
//   console.log('test YK_ENV')
//   baseUrl = '/api'
// }
// 获取用户名
// export const getUserName = params => {
//   return axios.post(`${baseUrl}/api/login/get_user_name`,params);
// };
// // 登录
// export const loginTodo = params => {
//   return axios.post(`${baseUrl}/api/login/do_login`,params);
// };
// 登录-第一步-获取凭证
// export const loginCasOne = params => { return axios.get('https://testam.yktour.com.cn/am/cas/login?ajax=1',params)};
// 登录-第一步-发送凭证
// export const loginCasSecond = params => { return axios.post('https://testam.yktour.com.cn/am/cas/login?ajax=1',params)};

export const axiosRequestHandler = url => {
  return ({
    params = {},
    headers = {},
    method = "post",
    success = () => {},
    showLoading = false,
    formdata = false
  } = {}) => {
    let loading = null;
    let isUsernameChange =
      window.$username && window.$username != localStorage.getItem("username");
    // if (url != `${baseUrl}/api/login/get_user_name` && isUsernameChange) {
    if (isUsernameChange) {
      Message({
        message: "登陆用户发生变化！",
        type: "warning",
        duration: 1500,
        showClose: true,
        onClose() {
          window.location.reload();
        }
      });
      return;
    }
    if (showLoading) {
      loading = Loading.service({
        fullscreen: true
      });
    }
    let isMethodArray = ["get", "delete", "put"];
    let config = {
      url: url,
      headers: headers,
      method: method,
      data: formdata ? Qs.stringify(params) : params
    };
    if (isMethodArray.indexOf(method) != "-1") {
      config.params = params;
    }
    axios(config)
      .then(params => {
        let { code, msg, data } = params["data"];
        loading && loading.close();
        if (code == 10000) {
          window.location.href = data;
        } else if (code == 403) {
          Vue.$alert(msg, "提示", {
            confirmButtonText: "确定",
            type: "error"
          });
        } else {
          success(params);
        }
      })
      .catch(error => {
        console.log("request error: ", error);
        loading && loading.close();
        success({
          data: {
            code: 50000,
            msg: "服务器请求失败，请刷新重试"
          }
        });
      });
  };
};
export const newCommonRequestHandler = (path, isBase = true) =>
  axiosRequestHandler(`${isBase ? baseUrl : ""}${path}`);
