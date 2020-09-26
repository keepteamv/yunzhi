import request from '@/utils/request';

export async function query(params) {
  return request('/api/Order/getPages', {
    method: 'POST',
    data: params,
  });
}
export async function queryMakeQueues(params) {
  return request('/api/Order/getMakeQueues', {
    params
  });
}
export async function refund(params) {
  return request('/api/Order/refund', {
    method: 'POST',
    data: { ...params },
  });
}