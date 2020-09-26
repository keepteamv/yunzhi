import request from '@/utils/request';

export async function queryRule(params) {
  return request('/api/Product/getPages', {
    method: 'POST',
    data: { ...params },
  });
}
export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}

export async function queryProductCategorys(params) {
  return request('/api/ProductCategory/getAll', {
    method: 'GET',
    params,
  });
}