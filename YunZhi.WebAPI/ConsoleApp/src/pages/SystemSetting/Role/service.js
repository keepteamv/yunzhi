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
// 添加组
export async function addGroup(params) {
  return request('/api/RoleGroup/create', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
// 修改组
export async function updateGroup(params) {
  return request('/api/RoleGroup/update', {
    method: 'POST',
    data: { ...params },
  });
}
// 保存组关联信息
export async function editGroup(params) {
  return request('/api/Role/saveRoleGroupRole', {
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
// 保存菜单权限
export async function savePermissionMenu(params) {
  return request('/api/Permission/savePermissionMenu', {
    method: 'POST',
    data: { ...params },
  });
}
// 保存操作权限
export async function savePermissionOperation(params) {
  return request('/api/Permission/savePermissionOperation', {
    method: 'POST',
    data: { ...params },
  });
}
// 创建操作组
export async function createOperationGroup(params) {
  return request('/api/OperationGroup/create', {
    method: 'POST',
    data: { ...params },
  });
}
// 创建操作
export async function createOperation(params) {
  return request('/api/Operation/create', {
    method: 'POST',
    data: { ...params },
  });
}
// 读取角色组列表
export async function queryRoleGroup() {
  return request('/api/RoleGroup/getList');
}
// 读取角色组Id列表
export async function queryRoleGroupIds(params) {
  return request('/api/RoleGroup/getIdsByRoleId', {
    params
  });
}