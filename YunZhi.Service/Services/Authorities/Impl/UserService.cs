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
                var entity = new User
                {
                    UserName = request.UserName,
                    Password = request.Password,
                    PhoneNumber = request.PhoneNumber,
                    RealName = request.RealName,
                    Email = request.Email,
                    AvatarUrl = request.AvatarUrl
                };
                // 新增
                await RegisterNewAsync(entity);
                // 提交
                var flag = await CommitAsync();

                rsp.Message = flag ? "新增成功" : "新增失败";
                rsp.Success = flag;
                rsp.Data = entity.Id;
                return rsp;
            });
        }
        /// <summary>
        /// 修改
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ApiResult<string>> UpdateAsync(UpdateUserRequest request)
        {
            return await ExecuteResultAsync(async query =>
            {
                var rsp = new ApiResult<string>();
                var entity = await query.FirstOrDefaultAsync(p => p.Id == request.Id);
                if (entity == null)
                {
                    rsp.Message = "找不到要修改的信息.";
                    return rsp;
                }

                entity.PhoneNumber = request.PhoneNumber;
                entity.RealName = request.RealName;
                // 密码不为空才修改
                if (!string.IsNullOrEmpty(request.Password))
                {
                    entity.Password = request.Password;
                }
                // 修改
                RegisterDirty(entity);
                // 提交
                var flag = await CommitAsync();

                rsp.Message = flag ? "更新成功" : "更新失败";
                rsp.Success = flag;
                rsp.Data = entity.Id;
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
                // 通过角色组检索
                else if (!string.IsNullOrEmpty(request.RoleGroupId))
                {
                    result = await QueryNoTracking<RoleGroupUser>()
                        .Include(p => p.User)
                        .Where(p => p.RoleGroupId == request.RoleGroupId)
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

        /// <summary>
        /// 保存用户组与用户关联信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ApiResult<string>> SaveUserGroupUserAsync(SaveUserGroupUserRequest request)
        {
            return await ExecuteResultAsync(async query =>
            {
                var rsp = new ApiResult<string>();
                // 先把已有的权限数据删除
                // 读取关联信息
                var userGroupUsers = await Query<UserGroupUser>()
                    .Where(p => p.UserId == request.UserId)// 只读取操作的
                    .ToListAsync();
                // 如果找到
                if (userGroupUsers.Count > 0)
                {
                    // 删除
                    RegisterDeleteRange(userGroupUsers);
                }
                var entities = request.UserGroupIds.Select(groupId => new UserGroupUser
                {
                    UserId = request.UserId,
                    UserGroupId = groupId
                }).ToList();
                await RegisterNewRangeAsync(entities);
                // 提交
                var flag = await CommitAsync();
                rsp.Message = flag ? "保存成功" : "保存失败";
                rsp.Success = flag;
                return rsp;
            });
        }
        /// <summary>
        /// 保存用户与角色关联信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ApiResult<string>> SaveUserRoleAsync(SaveUserRoleRequest request)
        {
            return await ExecuteResultAsync(async query =>
            {
                var rsp = new ApiResult<string>();
                // 先把已有的权限数据删除
                // 读取关联信息
                var userRoles = await Query<UserRole>()
                    .Where(p => p.UserId == request.UserId)// 只读取操作的
                    .ToListAsync();
                // 如果找到
                if (userRoles.Count > 0)
                {
                    // 删除
                    RegisterDeleteRange(userRoles);
                }
                var entities = request.RoleIds.Select(groupId => new UserRole
                {
                    UserId = request.UserId,
                    RoleId = groupId
                }).ToList();
                await RegisterNewRangeAsync(entities);
                // 提交
                var flag = await CommitAsync();
                rsp.Message = flag ? "保存成功" : "保存失败";
                rsp.Success = flag;
                return rsp;
            });
        }
    }
}