using System.Collections.Generic;
using System.Threading.Tasks;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities.Requests.Roles;
namespace YunZhi.Service.Services.Authorities
{
    public interface IRoleService
    {
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> InsertAsync(InsertRoleRequest request);
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> UpdateAsync(UpdateRoleRequest request);
        /// <summary>
        /// 读取分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<Page<Role>>> GetPagesAsync(GetRolePagesRequest request);

        /// <summary>
        /// 保存角色组与角色关联信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> SaveRoleGroupRoleAsync(SaveRoleGroupRoleRequest request);

        /// <summary>
        /// 根据用户ID读取角色ID
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<ApiResult<IList<string>>> GetIdsByUserIdAsync(string userId);
        /// <summary>
        /// 根据用户ID读取所有角色ID，包含用户组和角色组
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<ApiResult<IList<string>>> GetAllIdsByUserIdAsync(string userId);
        /// <summary>
        /// 读取数据列表
        /// </summary>
        /// <returns></returns>
        Task<ApiResult<IList<Role>>> GetListAsync();

    }
}