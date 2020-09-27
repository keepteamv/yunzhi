using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Infrastructure.Attributes;
using YunZhi.Service.Models;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities.Requests.Permissions;

namespace YunZhi.Service.Services.Authorities.Impl
{
    [Component]
    public class PermissionService : ServiceBase<Permission>, IPermissionService
    {
        public PermissionService(YunZhiDbContext context) : base(context)
        {
        }
        /// <summary>
        /// 保存权限菜单
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ApiResult<string>> SavePermissionMenuAsync(SavePermissionMenuRequest request)
        {
            return await ExecuteResultAsync(async query =>
            {
                var rsp = new ApiResult<string>();
                // 先把已有的权限数据删除
                // 读取角色权限
                var rolePermissionsResult = await Query<RolePermission>()
                    .Include(p => p.Permission)
                    .Where(p => p.Permission.PermissionType == PermissionType.Menu)// 只读取菜单的
                    .Where(p => p.RoleId == request.RoleId)
                    .ToListAsync();
                // 如果找到
                if (rolePermissionsResult.Count > 0)
                {
                    // 权限Id
                    var permissionIds = rolePermissionsResult.Select(p => p.PermissionId).ToList();
                    // 删除
                    RegisterDeleteRange(rolePermissionsResult);
                    // 读取权限菜单
                    var permissionMenusResult = await Query<PermissionMenu>().Where(p => permissionIds.Contains(p.PermissionId)).ToListAsync();
                    if (permissionMenusResult.Count > 0)
                    {
                        // 删除
                        RegisterDeleteRange(permissionMenusResult);
                    }
                    // 读取权限
                    var permissionsResult = await Query<Permission>().Where(p => permissionIds.Contains(p.Id)).ToListAsync();
                    if (permissionsResult.Count > 0)
                    {
                        // 删除
                        RegisterDeleteRange(permissionsResult);
                    }
                }
                // 权限实体列表
                var permissions = new List<Permission>();
                // 权限菜单实体列表
                var permissionMenus = new List<PermissionMenu>();
                // 角色权限实体列表
                var rolePermissions = new List<RolePermission>();
                // 处理数据
                foreach (var menuId in request.MenuIds)
                {
                    var permission = new Permission
                    {
                        PermissionType = PermissionType.Menu
                    };
                    // 添加权限
                    permissions.Add(permission);
                    // 添加权限菜单
                    permissionMenus.Add(new PermissionMenu
                    {
                        PermissionId = permission.Id,
                        MenuId = menuId
                    });
                    // 添加角色权限
                    rolePermissions.Add(new RolePermission
                    {
                        PermissionId = permission.Id,
                        RoleId = request.RoleId
                    });
                }
                await RegisterNewRangeAsync(permissions);
                await RegisterNewRangeAsync(permissionMenus);
                await RegisterNewRangeAsync(rolePermissions);
                // 提交
                var flag = await CommitAsync();
                rsp.Message = flag ? "保存成功" : "保存失败";
                rsp.Success = flag;
                return rsp;
            });
        }
        /// <summary>
        /// 保存权限操作
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ApiResult<string>> SavePermissionOperationAsync(SavePermissionOperationRequest request)
        {
            return await ExecuteResultAsync(async query =>
            {
                var rsp = new ApiResult<string>();
                // 先把已有的权限数据删除
                // 读取角色权限
                var rolePermissionsResult = await Query<RolePermission>()
                    .Include(p => p.Permission)
                    .Where(p => p.Permission.PermissionType == PermissionType.Operation)// 只读取操作的
                    .Where(p => p.RoleId == request.RoleId)
                    .ToListAsync();
                // 如果找到
                if (rolePermissionsResult.Count > 0)
                {
                    // 权限Id
                    var permissionIds = rolePermissionsResult.Select(p => p.PermissionId).ToList();
                    // 删除
                    RegisterDeleteRange(rolePermissionsResult);
                    // 读取权限操作
                    var permissionOperationsResult = await Query<PermissionOperation>()
                        .Where(p => permissionIds.Contains(p.PermissionId))
                        .ToListAsync();
                    if (permissionOperationsResult.Count > 0)
                    {
                        // 删除
                        RegisterDeleteRange(permissionOperationsResult);
                    }
                    // 读取权限
                    var permissionsResult = await Query<Permission>().Where(p => permissionIds.Contains(p.Id)).ToListAsync();
                    if (permissionsResult.Count > 0)
                    {
                        // 删除
                        RegisterDeleteRange(permissionsResult);
                    }
                }
                // 权限实体列表
                var permissions = new List<Permission>();
                // 权限操作实体列表
                var permissionOperations = new List<PermissionOperation>();
                // 角色权限实体列表
                var rolePermissions = new List<RolePermission>();
                // 处理数据
                foreach (var operationId in request.OperationIds)
                {
                    var permission = new Permission
                    {
                        PermissionType = PermissionType.Operation
                    };
                    // 添加权限
                    permissions.Add(permission);
                    // 添加权限操作
                    permissionOperations.Add(new PermissionOperation
                    {
                        PermissionId = permission.Id,
                        OperationId = operationId
                    });
                    // 添加角色权限
                    rolePermissions.Add(new RolePermission
                    {
                        PermissionId = permission.Id,
                        RoleId = request.RoleId
                    });
                }
                await RegisterNewRangeAsync(permissions);
                await RegisterNewRangeAsync(permissionOperations);
                await RegisterNewRangeAsync(rolePermissions);
                // 提交
                var flag = await CommitAsync();
                rsp.Message = flag ? "保存成功" : "保存失败";
                rsp.Success = flag;
                return rsp;
            });
        }
    }
}