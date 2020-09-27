using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities.Requests.Permissions;

namespace YunZhi.Service.Services.Authorities
{
    public interface IPermissionService
    {
        /// <summary>
        /// 保存权限菜单
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> SavePermissionMenuAsync(SavePermissionMenuRequest request);
        /// <summary>
        /// 保存权限操作
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> SavePermissionOperationAsync(SavePermissionOperationRequest request);
    }
}
