using System.Collections.Generic;
using System.Threading.Tasks;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities.Requests.UserGroups;
namespace YunZhi.Service.Services.Authorities
{
    public interface IUserGroupService
    {
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> InsertAsync(InsertUserGroupRequest request);
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> UpdateAsync(UpdateUserGroupRequest request);
        /// <summary>
        /// 读取分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<Page<UserGroup>>> GetPagesAsync(GetUserGroupPagesRequest request);
        /// <summary>
        /// 读取数据列表
        /// </summary>
        /// <returns></returns>
        Task<ApiResult<IList<UserGroup>>> GetListAsync();
        /// <summary>
        /// 根据用户ID读取组ID
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<ApiResult<IList<string>>> GetIdsByUserIdAsync(string userId);
    }
}