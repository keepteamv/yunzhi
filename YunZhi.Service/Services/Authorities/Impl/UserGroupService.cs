using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Infrastructure.Attributes;
using YunZhi.Service.Infrastructure.Extensions;
using YunZhi.Service.Models;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities.Requests.UserGroups;

namespace YunZhi.Service.Services.Authorities.Impl
{
    [Component]
    public class UserGroupService : ServiceBase<UserGroup>, IUserGroupService
    {
        public UserGroupService(YunZhiDbContext context) : base(context)
        {
        }
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ApiResult<string>> InsertAsync(InsertUserGroupRequest request)
        {
            return await ExecuteResultAsync(async query =>
            {
                var rsp = new ApiResult<string>();
                var entity = new UserGroup
                {
                    Name = request.Name,
                    Status = request.Status,
                    Remarks = request.Remarks
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
        public async Task<ApiResult<string>> UpdateAsync(UpdateUserGroupRequest request)
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

                entity.Name = request.Name;
                entity.Remarks = request.Remarks;
                entity.Status = request.Status;
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
        public async Task<ApiResult<Page<UserGroup>>> GetPagesAsync(GetUserGroupPagesRequest request)
        {
            return await QueryResultAsync(async query =>
            {
                var rsp = new ApiResult<Page<UserGroup>>();

                var result = await query
                    .HasWhere(request.Name, p => p.Name.Contains(request.Name))
                    .ToPageAsync(request.PageIndex, request.PageSize);
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
        /// 读取数据列表
        /// </summary>
        /// <returns></returns>
        public async Task<ApiResult<IList<UserGroup>>> GetListAsync()
        {
            return await QueryResultAsync(async query =>
            {
                var rsp = new ApiResult<IList<UserGroup>>();

                var result = await query.ToListAsync();
                if (result.Count == 0)
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
        /// 根据用户ID读取组ID
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<ApiResult<IList<string>>> GetIdsByUserIdAsync(string userId)
        {
            return await QueryResultAsync(async query =>
            {
                var rsp = new ApiResult<IList<string>>();

                var result = await QueryNoTracking<UserGroupUser>()
                    .Where(p => p.UserId == userId)
                    .Select(p => p.UserGroupId)
                    .ToListAsync();
                if (result.Count == 0)
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