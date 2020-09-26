import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';
import { message } from 'antd';
import { useRequest } from 'umi';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/', target = '_self' }) =>
      (path && target !== '_blank' && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

/**
 * 提交处理
 * @param {*} func
 * @param {*} fields
 */
export const submitHandle = async (func, fields) => {
  const hide = message.loading('正在处理.');
  try {
    const res = await func(fields);
    hide();
    if (res.success) {
      message.success('处理成功.');
      return true;
    }
    message.error(res.message);
    return false;
  } catch (error) {
    hide();
    message.error('处理失败,请重试！');
    return false;
  }
}

/**
 * Request请求
 * @param {*} request 请求
 * @param {*} onSuccess 成功的回调函数
 * @param {*} config useRequest 参数
 * @returns {*} { run,loading }
 * @example const {run,loading} = useRequestHandle(add);
 */
export const useRequestHandle = (request, onSuccess, config = {}) => {
  return useRequest(request, {
    manual: true,
    formatResult: response => response,
    onSuccess: (res) => {
      if (res.success) {
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(res.data);
        } else {
          message.success(res.message);
        }
      } else {
        message.error(res.message);
      }
    },
    onError: error => {
      message.error(error.message);
    },
    ...config
  });
}

/**
 * 深度拷贝
 * @param {*} obj 
 */
export const deepClone = (obj) => {
  function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
  }

  if (!isObject(obj)) {
    throw new Error('非对象')
  }
  const isArray = Array.isArray(obj)
  const newObj = isArray ? [...obj] : { ...obj }
  Reflect.ownKeys(newObj).forEach(key => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
  })
  return newObj;
}