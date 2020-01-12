import {
  newCommonRequestHandler
} from './api_new';
import http from 'src/plugins/axios';
// 旅游线路-线路行程-本地上传图片
export const uploadimage = newCommonRequestHandler('/v1/photo/upload');
// 旅游线路-线路行程-是否签署免责协议
export const getPhotoAgreement = newCommonRequestHandler('/v1/photo/get-agreement');
// 旅游线路-线路行程-签署协议
export const setPhotoAgreement = (p) => http.post('photo/agreement', p);

// 签署本地上传
export const getPhotoAgreementStatus = (p) => http.post('photo/get-agreement', p, false);
