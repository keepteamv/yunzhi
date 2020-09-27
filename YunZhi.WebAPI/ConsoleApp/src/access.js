import request from '@/utils/request'
import { getToken, getPermissions, setPermissions } from '@/utils/authority'

export default () => {
  // 读取本地缓存
  let permissions = getPermissions();
  // 如果本地没有
  if (permissions.length === 0) {
    if (getToken()) {
      // 调用接口读取
      request('/api/Permission/getPermissions', {
        method: 'GET'
      }).then(res => {
        if (res.success) {
          permissions = res.data;
          setPermissions(permissions);
        }
      });
    }
  }
  return {
    // 是否有操作权限
    canOperation(code) {
      return permissions.findIndex(p => p === code) !== -1;
    }
  };
}