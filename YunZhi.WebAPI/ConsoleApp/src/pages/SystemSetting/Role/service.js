import request from '@/utils/request';

export async function query(params) {
  return request('/api/Role/getPages', {
    method: 'POST',
    data: params,
  });
}
export async function add(params) {
  return request('/api/Role/create', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function update(params) {
  return request('/api/Role/update', {
    method: 'POST',
    data: { ...params },
  });
}
export async function updateStatus(params) {
  return request('/api/Role/updateStatus', {
    method: 'POST',
    data: { ...params },
  });
}

// 读取菜单
export async function getMenus(params) {
  return request('/api/Menu/getTreeList', {
    params
  });
}
// 根据角色ID读取菜单Ids
export async function getMenuIdsByRoleId(params) {
  return request('/api/Menu/getMenuIdsByRoleId', {
    params
  });
}
// 读取操作列表
export async function getOperations(params) {
  return request('/api/Operation/getList', {
    params
  });
}