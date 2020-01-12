const date = function(date) {
  date = new Date(date);
  return (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()).replace(/\-(\d)(?!\d)/g, '-0$1');
};

/**
 * 使用Number.toFixed部分场景下会出现5不入，
 * 如: (4.0005).toFixed(3) => 4.000
 *    4.0005 + 0.0005 = 4.0009999999999994
 * by 陈权章 2018-01-18
 */ 
function toFixed(num, digits = 0){
  let fixedNum = Number(num);

  if(RegExp('\\.\\d{' + digits + '}5').test(num)){
    const exp = Math.pow(10, digits);
    fixedNum = parseInt(num * exp + 1) / exp;
  }
  
  // console.log('num:', num, 'fixedNum', fixedNum);
  return fixedNum.toFixed(digits);
}

/**
 * 格式化金额，最多保留三位小数
 * @param {string|number} price 
 */
function formatPrice(price) {
  const num = Number(price);

  if (!num) {
    return 0;
  } else if (!/\.\d{4}/.test(num)) {
    return num;
  }
  return Number(toFixed(num, 3));
}

/**
 * 计算删除html标签后内容的长度
 */
function noHtmlLength(val) {
  let str = val;
  str = str.replace(/<[^>]+>/g, '');
  return str.length
}

function getCalendarDate (time){
  let newTime = time ? new Date(time) : new Date()
  let year = newTime.getFullYear()
  let month = newTime.getMonth() + 1
  month = month < 10 ? `0${month}` : month
  let date = newTime.getDate()
  date = date < 10 ? `0${date}` : date
  return `${year}-${month}-${date}`
}
function dateFormat(date, format) {
  if(format === undefined){
    format = date;
    date = new Date();
  }
  var map = {
    'M': date.getMonth() + 1, //月份 
    'd': date.getDate(), //日 
    'h': date.getHours(), //小时 
    'm': date.getMinutes(), //分 
    's': date.getSeconds(), //秒 
    'q': Math.floor((date.getMonth() + 3) / 3), //季度 
    'S': date.getMilliseconds() //毫秒 
  };
  format = format.replace(/([yMdhmsqS])+/g, function(all, t){
    var v = map[t];
    if(v !== undefined){
      if(all.length > 1){
        v = '0' + v;
        v = v.substr(v.length-2);
      }
      return v;
    }
    else if(t === 'y'){
      return (date.getFullYear() + '').substr(4 - all.length);
    }
    return all;
  });
  return format;
}
export { 
  date,
  toFixed,
  formatPrice,
  noHtmlLength,
  getCalendarDate,
  dateFormat
};