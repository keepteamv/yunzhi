import request from '@/utils/request';

export async function queryManager(params) {
  return request('/api/Manager/getPages', {
    method: 'POST',
    data: params,
  });
}
export async function addManager(params) {
  return request('/api/Manager/create', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateStatus(params) {
  return request('/api/Manager/updateStatus', {
    method: 'POST',
    data: { ...params },
  });
}
// 读取七牛上传token
export async function getUploadToken() {
  return request('/api/QiNiuCloud/getUploadToken');
}
// 更新负责人信息
export async function updatePersonInCharge(params) {
  return request('/api/Manager/updatePersonInCharge', {
    method: 'POST',
    data: { ...params },
  });
}