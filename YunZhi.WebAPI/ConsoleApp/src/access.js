import request from '@/utils/request'
import { getToken, getMenus, setMenus } from '@/utils/authority'

export default () => {
  // 读取本地缓存
  let menus = getMenus();
  // 如果本地没有
  if (menus.length === 0) {
    if (getToken()) {
      // 调用接口读取
      request('/api/Menu/getTreeList', {
        method: 'GET'
      }).then(res => {
        if (res.success) {
          menus = res.data;
          setMenus(res.data);
        }
      });
    }
  }
  return {
    // 是否有操作权限
    canOperation(path, name) {
      return menus.find(t1 => {
        return t1.children.find(t2 => {
          return t2.path === path && (t2.children && t2.children.length > 0 && t2.children.find(t3 => t3.name === name) !== undefined) || (t2.name === name);
        }) !== undefined;
      }) !== undefined;
    }
  };
}