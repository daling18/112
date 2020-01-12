//验证手机号码
const phoneReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;

//只保留汉字
const textReg = /^[\u4e00-\u9fa5]+$/;

//验证数字
const numberReg = /^\d*$/;
//验证数字12-22位
const numberRegSeat = /^\d{12,22}$/;
//正数（包括小数）
const positiveNumReg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
//0-100之间的正整数
// const integerReg = /^([1-9][0-9]{0,1}|100)$/
const integerReg = /^100$|^(\d|[0-9]\d)$/;

export {
  phoneReg,
  textReg,
  numberReg,
  numberRegSeat,
  integerReg,
  positiveNumReg
};
