import request from '@/utils/request';

export async function query(params) {
  return request('/api/ManagerCashOutRecord/getPages', {
    method: 'POST',
    data: params,
  });
}
export async function processing(params) {
  return request('/api/ManagerCashOutRecord/inProcess', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
// 详情
export async function detail(params) {
  return request('/api/ManagerCashOutRecord/getDetail', {
    params
  });
}

// 读取银行卡帐户列表
export async function queryBankAccounts(params) {
  return request('/api/ManagerBankAccount/getSelectInfo', {
    params
  });
}
// 读取可用余额
export async function getCashAccountBalance() {
  return request('/api/Manager/getCashAccountBalance');
}