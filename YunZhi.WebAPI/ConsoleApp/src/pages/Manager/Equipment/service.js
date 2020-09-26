import request from '@/utils/request';

export async function queryEquipment(params) {
  return request('/api/Equipment/getPages', {
    method: 'POST',
    data: params,
  });
}
export async function addEquipment(params) {
  return request('/api/Equipment/create', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateEquipment(params) {
  return request('/api/Equipment/update', {
    method: 'POST',
    data: { ...params },
  });
}
export async function updateStatus(params) {
  return request('/api/Equipment/updateStatus', {
    method: 'POST',
    data: { ...params },
  });
}
