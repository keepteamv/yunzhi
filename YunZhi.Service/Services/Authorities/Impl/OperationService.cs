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
                    Tips = request.Tips,
                    Sort = request.Sort,
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
                entity.Sort = request.Sort;
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
        public async Task<ApiResult<Page<Operation>>> GetPagesAsync(GetOperationPagesRequest request)
        {
            return await QueryResultAsync(async query =>
            {
                var rsp = new ApiResult<Page<Operation>>();

                var result = await query
                    .HasWhere(request.Name, p => p.Name.Contains(request.Name))
                    .OrderBy(p => p.Sort)
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

                var result = await QueryNoTracking<OperationGroup>()
                    .Include(p => p.Operations)
                    .OrderBy(p => p.Sort)
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
                var data = result.Select(item => new GetOperationsResponse
                {
                    OperationGroupId = item.Id,
                    Name = item.Name,
                    Value = item.Id,
                    Label = item.Name,
                    CheckedList = item.Operations
                        .Where(p => operationIds.Contains(p.Id))
                        .Select(p => p.Id)
                        .ToList(),
                    Children = item.Operations.Select(p => new GetOperationsResponse
                    {
                        Id = p.Id,
                        OperationGroupId = item.Id,
                        Label = p.Name,
                        Value = p.Id,
                        Name = p.Name,
                        Code = p.Code,
                        Tips = p.Tips,
                        //Checked = operationIds.Any(id => id == p.Id)
                    }).ToList()
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
                    .Select(p => p.Operation.Code)
                    .ToListAsync();
                if (result.Count == 0)
                {
                    rsp.Message = "暂无数据.";
                    return rsp;
                }
                var items = new List<string>();
                // 分割数据，处理前: webapi.xx.cc,webapi.sss.cc ,处理后：["webapi.xx.cc","webapi.sss.cc"]
                foreach (var item in result)
                {
                    items.AddRange(item.Split(','));
                }
                // 使用操作ID分组，过滤重复数据
                var data = items.GroupBy(code => code).Select(p => p.FirstOrDefault()).ToList();
                rsp.Message = "读取成功.";
                rsp.Data = data;
                rsp.Success = true;
                return rsp;
            });
        }
    }
}