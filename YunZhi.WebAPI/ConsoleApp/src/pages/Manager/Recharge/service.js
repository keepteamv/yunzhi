import request from '@/utils/request';

export async function query(params) {
  return request('/api/ManagerRecharge/getPages', {
    method: 'POST',
    data: params,
  });
}
export async function confirm(params) {
  return request('/api/ManagerRecharge/confirm', {
    params
  });
}
// 详情
export async function detail(params) {
  return request('/api/ManagerRecharge/getDetail', {
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

// 读取七牛上传token
export async function getUploadToken() {
  return request('/api/QiNiuCloud/getUploadToken');
}