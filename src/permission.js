import {parse} from 'qs';
const permissions = window.permission !== '{$permission}' ? JSON.parse(window.permission) : '';
const isProduction = process.env.NODE_ENV === 'production';

const routerPermission = (apiNames = '') => {
    if (!isProduction) {
      return true;
    }
    let permission = false;
    apiNames = apiNames ? apiNames.split(',') : [];
    for (let i = 0; i < apiNames.length; i++) {
      if (permissions[apiNames[i]]) {
        permission = true;
        break;
      }
    }
    return permission;
  }
  

export default routerPermission;