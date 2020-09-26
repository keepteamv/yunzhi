import request from '@/utils/request';

export async function queryList(params) {
  return request('/api/ManagerIncomeAndExpense/getPages', {
    method: 'POST',
    data: params,
  });
}