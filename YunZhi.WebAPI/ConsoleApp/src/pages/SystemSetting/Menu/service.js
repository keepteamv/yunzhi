import request from '@/utils/request';

export async function query(params) {
  return request('/api/Menu/getTreeList', {
    params,
  });
}
export async function add(params) {
  return request('/api/Menu/create', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function update(params) {
  return request('/api/Menu/update', {
    method: 'POST',
    data: { ...params },
  });
}
export async function updateStatus(params) {
  return request('/api/Menu/updateStatus', {
    method: 'POST',
    data: { ...params },
  });
}

export async function queryTreeList(params) {
  return request('/api/Menu/getTreeList', {
    params,
  });
}