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
// 保存用户角色关联信息
export async function updateRole(params) {
  return request('/api/User/saveUserRole', {
    method: 'POST',
    data: { ...params },
  });
}

// 添加组
export async function addGroup(params) {
  return request('/api/UserGroup/create', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
// 修改组
export async function updateGroup(params) {
  return request('/api/UserGroup/update', {
    method: 'POST',
    data: { ...params },
  });
}

// 保存组关联信息
export async function editGroup(params) {
  return request('/api/User/saveUserGroupUser', {
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

// 读取用户组列表
export async function queryUserGroup() {
  return request('/api/UserGroup/getList');// 
}
// 读取用户组Id列表
export async function queryUserGroupIds(params) {
  return request('/api/UserGroup/getIdsByUserId', {
    params
  });
}
// 读取角色列表
export async function queryRoles() {
  return request('/api/Role/getList');
}
// 读取角色Id列表
export async function queryRoleIds(params) {
  return request('/api/Role/getIdsByUserId', {
    params
  });
}