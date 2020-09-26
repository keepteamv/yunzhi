import request from '@/utils/request';

export async function query(params) {
  return request('/api/User/getPages', {
    method: 'POST',
    data: params,
  });
}
export async function add(params) {
  return request('/api/User/create', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function update(params) {
  return request('/api/User/update', {
    method: 'POST',
    data: { ...params },
  });
}
export async function updateRole(params) {
  return request('/api/User/updateRoleIds', {
    method: 'POST',
    data: { ...params },
  });
}

// 读取角色列表
export async function getRoles(params) {
  return request('/api/Role/getListByWebsiteType', {
    params
  });
}

// queryUserGroup
export async function queryUserGroup() {
  return request('/api/UserGroup/getList');
}