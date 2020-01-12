import axios from 'axios';
import Moment from "moment"
const trim = (str) => {
  var reg = /(^\s*)|(\s*$)/g;
  str = typeof (str) == 'string' ? str : toString(str);
  return str.replace(reg, '');
}

const allTrim = (str) => {
  var reg = /\s*/g;
  str = typeof (str) == 'string' ? str : toString(str);
  return str.replace(reg, '');
}

// 实现深度克隆---对象/数组
function clone(target) {
  // 判断拷贝的数据类型,初始化变量result 成为最终克隆的数据
  let result
  switch (Object.prototype.toString.call(target)) {
    case '[object Object]':
      result = {};
      break
    case '[object Array]':
      result = [];
      break
    default:
      return
  }
  // 遍历目标数据
  for (let i in target) {
    result[i] = ['[object Object]', '[object Array]'].includes(Object.prototype.toString.call(target[i])) ?
      clone(target[i]) :
      target[i]
  }
  return result
}


function getOs() {
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    return "IE";
  }
  if (navigator.userAgent.indexOf("Firefox") > 0) {
    return "Firefox";
  }
  if (navigator.userAgent.indexOf("Safari") > 0) {
    return "Safari";
  }
  if (navigator.userAgent.indexOf("Camino") > 0) {
    return "Camino";
  }
  if (navigator.userAgent.indexOf("Gecko/") > 0) {
    return "Gecko";
  }
  return ""

}
/**
 * @params {url} 地址
 * @params { fileName} 文件名
 * @params { isCors } 是否地址存在跨域
 * @params {type }  文件类型   后期不行直接存mine map
 */
function download(url, fileName, isCors, type) {
  let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~\/])+$/;
  if (!reg.test(url)) {
    return new Promise(() => {
      return false
    })
  }
  let os = getOs()
  let link = document.createElement("a");
  if (isCors) {
    return new Promise(() => {
      if (os == "Firefox") {
        window.open(url)
      } else {
        link.href = url;
        link.setAttribute("download", (fileName || "下载文件") + `${Moment(new Date().getTime()).format("YYYYMMDDhhmmss")}${type ? '.' + type : ''}`);
        link.target = "_blank";
        link.click();
      }
      return true
    })
  }
  return axios({
    method: "get",
    url: url,
    responseType: "blob"
  }).then(function (res) {
    console.log({
      res
    })
    let blob = res.data;
    if (os == 'IE') {
      if ("msSaveOrOpenBlob" in navigator) {
        navigator.msSaveOrOpenBlob(blob);
      } else {
        link.href = url;
        link.target = "_blank";
        link.click();
      }
      return;
    }
    let objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;
    link.setAttribute("download", (fileName || "下载文件") + `${Moment(new Date().getTime()).format("YYYYMMDDhhmmss")}${type ? '.' + type : ''}`);
    document.body.appendChild(link);
    link.click();
    return true
  }).catch(err => {
    return false
  })
}
export function debounce(fun, delay) {
  let timer //定时器

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => { // 
      fun.apply(this, args)
    }, delay)
  }
}
export {
  download,
  trim,
  allTrim,
  clone
}
