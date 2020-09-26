using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Infrastructure.Attributes;
using YunZhi.Service.Infrastructure.Extensions;
using YunZhi.Service.Models;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities.Requests.Operations;
using YunZhi.Service.Services.Authorities.Responses.Operations;

namespace YunZhi.Service.Services.Authorities.Impl
{
    [Component]
    public class OperationService : ServiceBase<Operation>, IOperationService
    {
        public OperationService(YunZhiDbContext context) : base(context)
        {
        }
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ApiResult<string>> InsertAsync(InsertOperationRequest request)
        {
            return await ExecuteResultAsync(async query =>
            {
                var rsp = new ApiResult<string>();
                if (string.IsNullOrEmpty(request.OperationGroupId))
                {
                    rsp.Message = "操作组不能为空.";
                    return rsp;
                }
                var entity = new Operation
                {
                    OperationGroupId = request.OperationGroupId,
                    Name = request.Name,
                    Code = request.Code,
                    Tips = request.Tips
                };
                // 新增
                await RegisterNewAsync(entity);
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
        public async Task<ApiResult<string>> UpdateAsync(UpdateOperationRequest request)
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

                entity.OperationGroupId = request.OperationGroupId;
                entity.Name = request.Name;
                entity.Code = request.Code;
                entity.Tips = request.Tips;
                // 修改
                RegisterDirty(entity);
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
        public async Task<ApiResult<Page<Operation>>> GetPagesAsync(GetOperationPagesRequest request)
        {
            return await QueryResultAsync(async query =>
            {
                var rsp = new ApiResult<Page<Operation>>();

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
        /// 根据角色ID读取操作列表
        /// </summary>
        /// <param name="roleId">角色Id</param>
        /// <returns></returns>
        public async Task<ApiResult<IList<GetOperationsResponse>>> GetListAsync(string roleId)
        {
            return await QueryResultAsync(async query =>
            {
                var rsp = new ApiResult<IList<GetOperationsResponse>>();

                var result = await query
                    .Include(p => p.OperationGroup)
                    .ToListAsync();
                if (result.Count == 0)
                {
                    rsp.Message = "暂无数据.";
                    return rsp;
                }
                var operationIds = new List<string>();

                // 读取权限信息
                var permissionIds = await QueryNoTracking<RolePermission>()
                    .Include(p => p.Permission)
                    .Where(p => p.Permission.PermissionType == PermissionType.Operation) // 读取操作的
                    .Where(p => p.RoleId == roleId)
                    .Select(p => p.PermissionId)
                    .ToListAsync();
                if (permissionIds.Count > 0)
                {
                    // 根据权限读取操作Id数据
                    operationIds = await QueryNoTracking<PermissionOperation>()
                        .Where(p => permissionIds.Contains(p.PermissionId))
                        .Select(p => p.OperationId)
                        .ToListAsync();
                }
                // 处理结果
                var data = result.GroupBy(p => p.OperationGroupId).Select(group =>
                  {
                      var item = group.FirstOrDefault();
                      var d = new GetOperationsResponse
                      {
                          OperationGroupId = item.OperationGroupId,
                          Name = item.OperationGroup.Name,
                          Children = group.Select(p => new GetOperationsResponse
                          {
                              Name = p.Name,
                              Code = p.Code,
                              Tips = p.Tips,
                              Checked = operationIds.Any(id => id == p.Id)
                          }).ToList()
                      };
                      return d;
                  }).ToList();

                rsp.Message = "读取成功.";
                rsp.Data = data;
                rsp.Success = true;
                return rsp;
            });
        }
        /// <summary>
        /// 根据用户Id读取操作Code列表
        /// </summary>
        /// <returns></returns>
        public async Task<ApiResult<IList<string>>> GetOperationnCodesByUserIdAsync(string userId)
        {
            return await QueryResultAsync(async query =>
            {
                var rsp = new ApiResult<IList<string>>();
                // 角色IDs
                var roleIds = new List<string>();
                // 读取用户组信息,获取用户都加入了哪些组
                var userGroupIds = await QueryNoTracking<UserGroupUser>()
                    .Where(p => p.UserId == userId)
                    .Select(p => p.UserGroupId)
                    .ToListAsync();
                if (userGroupIds.Count > 0)
                {
                    // 读取用户组下的角色信息
                    var roleIds1 = await QueryNoTracking<UserGroupRole>()
                        .Where(p => userGroupIds.Contains(p.UserGroupId))
                        .Select(p => p.RoleId)
                        .ToListAsync();
                    if (roleIds1.Count > 0)
                    {
                        roleIds.AddRange(roleIds1);
                    }
                }
                // 读取角色信息
                var roleIds2 = await QueryNoTracking<UserRole>()
                    .Where(p => p.UserId == userId)
                    .Select(p => p.RoleId)
                    .ToListAsync();
                if (roleIds2.Count > 0)
                {
                    roleIds.AddRange(roleIds2);
                }
                if (roleIds.Count == 0)
                {
                    rsp.Message = "用户未绑定角色";
                    return rsp;
                }
                // 过滤数据
                roleIds = roleIds.GroupBy(id => id).Select(p => p.FirstOrDefault()).ToList();
                // 读取权限信息
                var permissionIds = await QueryNoTracking<RolePermission>()
                    .Include(p => p.Permission)
                    .Where(p => p.Permission.PermissionType == PermissionType.Operation) // 读取操作的
                    .Where(p => roleIds.Contains(p.RoleId)) // 角色Id过滤
                    .Select(p => p.PermissionId)
                    .ToListAsync();
                if (permissionIds.Count == 0)
                {
                    rsp.Message = "暂无数据.";
                    return rsp;
                }
                // 根据权限读取操作Id数据
                var result = await QueryNoTracking<PermissionOperation>()
                    .Include(p => p.Operation)
                    .Where(p => permissionIds.Contains(p.PermissionId))
                    .Select(p => p.Operation)
                    .GroupBy(p => p.Id) // 使用操作ID分组，用于过滤重复数据
                    .Select(p => p.FirstOrDefault().Code) // 过滤重复数据
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