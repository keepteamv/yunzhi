using System.Collections.Generic;
using System.Threading.Tasks;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities.Requests.RoleGroups;
namespace YunZhi.Service.Services.Authorities
{
    public interface IRoleGroupService
    {
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> InsertAsync(InsertRoleGroupRequest request);
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> UpdateAsync(UpdateRoleGroupRequest request);
        /// <summary>
        /// 读取分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<Page<RoleGroup>>> GetPagesAsync(GetRoleGroupPagesRequest request);
        /// <summary>
        /// 读取数据列表
        /// </summary>
        /// <returns></returns>
        Task<ApiResult<IList<RoleGroup>>> GetListAsync();
        /// <summary>
        /// 根据角色ID读取组ID
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        Task<ApiResult<IList<string>>> GetIdsByRoleIdAsync(string roleId);
    }
}