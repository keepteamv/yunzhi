using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Infrastructure.Attributes;
using YunZhi.Service.Infrastructure.Extensions;
using YunZhi.Service.Models;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities.Requests;
using YunZhi.Service.Services.Authorities.Requests.Users;
using YunZhi.Service.Services.Authorities.Responses.Users;

namespace YunZhi.Service.Services.Authorities.Impl
{
    [Component]
    public class UserService : ServiceBase<User>, IUserService
    {
        public UserService(YunZhiDbContext context) : base(context)
        {
        }
        public async Task<ApiResult<LoginResponse>> LoginAsync(LoginRequest request)
        {
            return await QueryResultAsync(async query =>
            {
                var rsp = new ApiResult<LoginResponse>();

                var result = await query.FirstOrDefaultAsync(p => p.UserName == request.UserName);
                if (result == null)
                {
                    rsp.Message = "用户名或密码错误.";
                    return rsp;
                }
                rsp.Message = "读取成功.";
                rsp.Data = new LoginResponse
                {
                    UserName = result.UserName,
                    Password = result.Password,
                    RealName = result.RealName,
                    Id = result.Id
                };
                rsp.Success = true;
                return rsp;
            });
        }
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ApiResult<string>> InsertAsync(InsertUserRequest request)
        {
            return await ExecuteResultAsync(async query =>
            {
                var rsp = new ApiResult<string>();
                var user = new User
                {
                    UserName = request.UserName,
                    Password = request.Password,
                    PhoneNumber = request.PhoneNumber,
                    RealName = request.RealName,
                    Email = request.Email,
                    AvatarUrl = request.AvatarUrl
                };
                // 新增
                await RegisterNewAsync(user);
                // 提交
                var flag = await CommitAsync();

                rsp.Message = flag ? "新增成功" : "新增失败";
                rsp.Success = flag;
                return rsp;
            });
        }
        /// <summary>
        /// 修改用户信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ApiResult<string>> UpdateAsync(UpdateUserRequest request)
        {
            return await ExecuteResultAsync(async query =>
            {
                var rsp = new ApiResult<string>();
                var user = await query.FirstOrDefaultAsync(p => p.Id == request.Id);
                if (user == null)
                {
                    rsp.Message = "找不到要修改的信息.";
                    return rsp;
                }

                user.PhoneNumber = request.PhoneNumber;
                user.RealName = request.RealName;
                // 密码不为空才修改
                if (!string.IsNullOrEmpty(request.Password))
                {
                    user.Password = request.Password;
                }
                // 修改
                RegisterDirty(user);
                // 提交
                var flag = await CommitAsync();

                rsp.Message = flag ? "更新成功" : "更新失败";
                rsp.Success = flag;
                return rsp;
            });
        }

        /// <summary>
        /// 读取分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ApiResult<Page<User>>> GetPagesAsync(GetUserPagesRequest request)
        {
            return await QueryResultAsync(async query =>
            {
                var rsp = new ApiResult<Page<User>>();

                var result = new Page<User>();

                // 如果通过用户组检索
                if (!string.IsNullOrEmpty(request.UserGroupId))
                {
                    result = await QueryNoTracking<UserGroupUser>()
                        .Include(p => p.User)
                        .Where(p => p.UserGroupId == request.UserGroupId)
                        .HasWhere(request.UserName, p => p.User.UserName.Contains(request.UserName))
                        .Select(p => p.User)
                        .ToPageAsync(request.PageIndex, request.PageSize);
                }
                else
                {
                    result = await query
                        .HasWhere(request.UserName, p => p.UserName.Contains(request.UserName))
                        .ToPageAsync(request.PageIndex, request.PageSize);
                }
                if (result.Items.Count == 0)
                {
                    rsp.Message = "暂无数据.";
                    return rsp;
                }
                rsp.Message = "读取成功.";
                rsp.Data = result;
                rsp.Success = true;
                return rsp;
            });
        }
    }
}