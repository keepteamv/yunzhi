import request from '@/utils/request';

// 保存权限
export async function updateMenuIds(params) {
  return request('/api/Role/updateMenuIds', {
    method: 'POST',
    data: { ...params },
  });
}

// 读取菜单列表
export async function getMenus(params) {
  return request('/api/Menu/getMenusByRoleId', {
    params
  });
}
// 读取菜单Id列表
export async function getMenuIds(params) {
  return request('/api/Menu/getMenuIdsByRoleId', {
    params
  });
}
// 
export async function getRolesForAuthority() {
  return request('/api/Role/getListForAuthority');
}