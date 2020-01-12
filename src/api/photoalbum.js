import { commonRequestHandler } from './api';

// 相册列表 https://testerp.yktour.com.cn/docs/bom/bom-1an3s1h21q9ut
export const getPhotoalbumList = commonRequestHandler('/api/photoalbum/get_photoalbum_list');
// 创建相册 https://testerp.yktour.com.cn/docs/bom/bom-1an3r8o5mfue0
export const createPhotoalbum = commonRequestHandler('/api/photoalbum/create_photoalbum');
// 删除相册 https://testerp.yktour.com.cn/docs/bom/bom-1an3s2ricf20f
export const delPhotoalbum = commonRequestHandler('/api/photoalbum/del_photoalbum');
// 编辑相册 https://testerp.yktour.com.cn/docs/bom/bom-1an3s22ab9er6
export const editPhotoalbum = commonRequestHandler('/api/photoalbum/edit_photoalbum');
// 图片库列表 https://testerp.yktour.com.cn/docs/bom/bom-1an3tag0j1qsu
export const getPhotoalbumSubList = commonRequestHandler('/api/photoalbum/get_photoalbum_sub_list');
// 相册-上传图片 https://testerp.yktour.com.cn/docs/bom/bom-1an3t00d362m2
export const createPhotoalbumSub = commonRequestHandler('/api/photoalbum/create_photoalbum_sub');
// 批量删除图片库照片 https://testerp.yktour.com.cn/docs/bom/bom-1an3tinka9rbu
export const delPhotoalbumSub = commonRequestHandler('/api/photoalbum/del_photoalbum_sub');
// 编辑图片 https://testerp.yktour.com.cn/docs/bom/bom-1anihfhfh83d4
export const editPhotoalbumsub = commonRequestHandler('/api/photoalbum/edit_photoalbumsub');
// 得到所有相册
export const getPhotoalbumcate = commonRequestHandler('/api/photoalbum/get_photoalbumcate');
// 移动照片 https://testerp.yktour.com.cn/docs/bom/bom-1an3tnqqjdce2
export const movePhotoalbumSub = commonRequestHandler('/api/photoalbum/move_photoalbum_sub');
// 视觉中国图片列表 https://testerp.yktour.com.cn/docs/bom/bom-1aqrluk44v0cf
export const getVcgImages = commonRequestHandler('/api/photoalbum/get_vcg_images');
// 上传视觉中国图片 https://testerp.yktour.com.cn/docs/bom/bom-1aqrn47038012
export const uploadVcgPic = commonRequestHandler('/api/photoalbum/upload_vcg_pic');
//视觉中国获取关键字
export const getVcgImageInfo  = commonRequestHandler('/api/photoalbum/get_vcg_image_info');
