import request from '@/utils/request';

export async function query(params) {
  return request('/api/Member/getPages', {
    method: 'POST',
    data: params,
  });
}
export async function add(params) {
  return request('/api/Member/create', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function update(params) {
  return request('/api/Member/update', {
    method: 'POST',
    data: { ...params },
  });
}
export async function updateStatus(params) {
  return request('/api/Member/updateStatus', {
    method: 'POST',
    data: { ...params },
  });
}
