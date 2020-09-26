using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities.Requests.Operations;
using YunZhi.Service.Services.Authorities.Responses.Operations;

namespace YunZhi.Service.Services.Authorities
{
    public interface IOperationService
    {
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> InsertAsync(InsertOperationRequest request);
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> UpdateAsync(UpdateOperationRequest request);
        /// <summary>
        /// 读取分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<Page<Operation>>> GetPagesAsync(GetOperationPagesRequest request);
        /// <summary>
        /// 根据角色ID读取操作列表
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<IList<GetOperationsResponse>>> GetListAsync(string roleId);
        /// <summary>
        /// 根据用户Id读取操作列表
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<ApiResult<IList<string>>> GetOperationnCodesByUserIdAsync(string userId);
    }
}
