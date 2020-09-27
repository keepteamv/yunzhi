using System.Threading.Tasks;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities.Requests;
using YunZhi.Service.Services.Authorities.Requests.Users;
using YunZhi.Service.Services.Authorities.Responses.Users;

namespace YunZhi.Service.Services.Authorities
{
    public interface IUserService
    {
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<LoginResponse>> LoginAsync(LoginRequest request);
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> InsertAsync(InsertUserRequest request);
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> UpdateAsync(UpdateUserRequest request);
        /// <summary>
        /// 读取分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<Page<User>>> GetPagesAsync(GetUserPagesRequest request);
        /// <summary>
        /// 保存用户组与用户关联信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> SaveUserGroupUserAsync(SaveUserGroupUserRequest request);
        /// <summary>
        /// 保存用户与角色关联信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> SaveUserRoleAsync(SaveUserRoleRequest request);
    }
}