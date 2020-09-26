import config from '@/config';
import { reloadAuthorized } from './Authorized'; // use localStorage to store the authority info, which might be sent from server in actual project.

const { platformKey } = config;

export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('antd-pro-authority') : str; // authorityString could be admin, "admin", ["admin"]

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  } // preview.pro.ant.design only do not use in your production.
  // preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }

  return authority;
}

export function getToken() {
  return localStorage.getItem(`yunzhi_${platformKey}_user_token`);
}
export function setToken(token) {
  return localStorage.setItem(`yunzhi_${platformKey}_user_token`, token);
}
export function clearToken() {
  return localStorage.removeItem(`yunzhi_${platformKey}_user_token`);
}

export function getUser() {
  const result = localStorage.getItem(`yunzhi_${platformKey}_user`) || '{}';
  return JSON.parse(result);
}
export function setUser(user) {
  const u = JSON.stringify(user);
  return localStorage.setItem(`yunzhi_${platformKey}_user`, u);
}
export function clearUser() {
  return localStorage.removeItem(`yunzhi_${platformKey}_user`);
}

export function getMenus() {
  const result = localStorage.getItem(`yunzhi_${platformKey}_menus`) || '[]';
  return JSON.parse(result);
}
export function setMenus(menus) {
  const u = JSON.stringify(menus);
  return localStorage.setItem(`yunzhi_${platformKey}_menus`, u);
}
export function clearMenus() {
  return localStorage.removeItem(`yunzhi_${platformKey}_menus`);
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority)); // auto reload

  reloadAuthorized();
}
