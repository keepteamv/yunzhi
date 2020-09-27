using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Infrastructure.Attributes;
using YunZhi.Service.Infrastructure.Extensions;
using YunZhi.Service.Models;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities.Requests.Roles;

namespace YunZhi.Service.Services.Authorities.Impl
{
    [Component]
    public class RoleService : ServiceBase<Role>, IRoleService
    {
        public RoleService(YunZhiDbContext context) : base(context)
        {
        }
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ApiResult<string>> InsertAsync(InsertRoleRequest request)
        {
            return await ExecuteResultAsync(async query =>
            {
                var rsp = new ApiResult<string>();
                var entity = new Role
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
        public async Task<ApiResult<string>> UpdateAsync(UpdateRoleRequest request)
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
        public async Task<ApiResult<Page<Role>>> GetPagesAsync(GetRolePagesRequest request)
        {
            return await QueryResultAsync(async query =>
            {
                var rsp = new ApiResult<Page<Role>>();

                var result = new Page<Role>();
                // 如果通过角色组检索
                if (!string.IsNullOrEmpty(request.RoleGroupId))
                {
                    result = await QueryNoTracking<RoleGroupRole>()
                        .Include(p => p.Role)
                        .Where(p => p.RoleGroupId == request.RoleGroupId)
                        .HasWhere(request.Name, p => p.Role.Name.Contains(request.Name))
                        .Select(p => p.Role)
                        .ToPageAsync(request.PageIndex, request.PageSize);
                }
                else
                {
                    result = await query
                        .HasWhere(request.Name, p => p.Name.Contains(request.Name))
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
        /// 保存角色组与角色关联信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ApiResult<string>> SaveRoleGroupRoleAsync(SaveRoleGroupRoleRequest request)
        {
            return await ExecuteResultAsync(async query =>
            {
                var rsp = new ApiResult<string>();
                // 先把已有的权限数据删除
                // 读取关联信息
                var roleGroupRoles = await Query<RoleGroupRole>()
                    .Where(p => p.RoleId == request.RoleId)// 只读取操作的
                    .ToListAsync();
                // 如果找到
                if (roleGroupRoles.Count > 0)
                {
                    // 删除
                    RegisterDeleteRange(roleGroupRoles);
                }
                var entities = request.RoleGroupIds.Select(groupId => new RoleGroupRole
                {
                    RoleId = request.RoleId,
                    RoleGroupId = groupId
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
        /// 根据用户ID读取角色ID
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public async Task<ApiResult<IList<string>>> GetIdsByUserIdAsync(string userId)
        {
            return await QueryResultAsync(async query =>
            {
                var rsp = new ApiResult<IList<string>>();

                var result = await QueryNoTracking<UserRole>()
                    .Where(p => p.UserId == userId)
                    .Select(p => p.RoleId)
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
        /// <summary>
        /// 读取数据列表
        /// </summary>
        /// <returns></returns>
        public async Task<ApiResult<IList<Role>>> GetListAsync()
        {
            return await QueryResultAsync(async query =>
            {
                var rsp = new ApiResult<IList<Role>>();

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
    }
}