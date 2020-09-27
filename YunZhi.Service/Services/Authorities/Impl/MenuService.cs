using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Infrastructure.Attributes;
using YunZhi.Service.Infrastructure.Extensions;
using YunZhi.Service.Models;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities.Requests.Menus;
using YunZhi.Service.Services.Authorities.Responses.Menus;

namespace YunZhi.Service.Services.Authorities.Impl
{
    [Component]
    public class MenuService : ServiceBase<Menu>, IMenuService
    {
        public MenuService(YunZhiDbContext context) : base(context)
        {
        }
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ApiResult<string>> InsertAsync(InsertMenuRequest request)
        {
            return await ExecuteResultAsync(async query =>
            {
                var rsp = new ApiResult<string>();
                var level = 0;
                if (!string.IsNullOrEmpty(request.ParentId))
                {
                    var p = await query.FirstOrDefaultAsync(p => p.Id == request.ParentId);
                    if (p == null)
                    {
                        rsp.Message = "找不到上级菜单信息.";
                        return rsp;
                    }
                    level = p.Level + 1;
                }
                var entity = new Menu
                {
                    ParentId = request.ParentId,
                    Name = request.Name,
                    Path = request.Path,
                    Sort = request.Sort,
                    Status = request.Status,
                    IsInside = request.IsInside,
                    Level = level
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
        public async Task<ApiResult<string>> UpdateAsync(UpdateMenuRequest request)
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

                entity.ParentId = request.ParentId;
                entity.Name = request.Name;
                entity.Path = request.Path;
                entity.Sort = request.Sort;
                entity.Status = request.Status;
                entity.IsInside = request.IsInside;
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
        public async Task<ApiResult<Page<Menu>>> GetPagesAsync(GetMenuPagesRequest request)
        {
            return await QueryResultAsync(async query =>
            {
                var rsp = new ApiResult<Page<Menu>>();

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
        /// 读取树形数据
        /// </summary>
        /// <returns></returns>
        public async Task<ApiResult<IList<GetMenusResponse>>> GetTreeListAsync()
        {
            return await QueryResultAsync(async query =>
            {
                var rsp = new ApiResult<IList<GetMenusResponse>>();

                var result = await query.OrderBy(p => p.Sort).ToListAsync();
                if (result.Count == 0)
                {
                    rsp.Message = "暂无数据.";
                    return rsp;
                }
                var data = new List<GetMenusResponse>();
                GetTreeChildren(result, data);
                rsp.Message = "读取成功.";
                rsp.Data = data;
                rsp.Success = true;
                return rsp;
            });
        }

        /// <summary>
        /// 根据角色读取菜单ID列表
        /// </summary>
        /// <returns></returns>
        public async Task<ApiResult<IList<string>>> GetMenuIdsByRoleIdAsync(string roleId)
        {
            return await QueryResultAsync(async query =>
            {
                var rsp = new ApiResult<IList<string>>();

                // 读取权限信息
                var permissionIds = await QueryNoTracking<RolePermission>()
                    .Include(p => p.Permission)
                    .Where(p => p.Permission.PermissionType == PermissionType.Menu) // 读取菜单的
                    .Where(p => p.RoleId == roleId)
                    .Select(p => p.PermissionId)
                    .ToListAsync();
                // 根据权限读取菜单Id数据
                var result = await QueryNoTracking<PermissionMenu>()
                    .Where(p => permissionIds.Contains(p.PermissionId))
                    .Select(p => p.MenuId)
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
        /// 根据用户Id读取菜单列表
        /// </summary>
        /// <returns></returns>
        public async Task<ApiResult<IList<GetMenusResponse>>> GetTreeListByUserIdAsync(string userId)
        {
            return await QueryResultAsync(async query =>
            {
                var rsp = new ApiResult<IList<GetMenusResponse>>();

                // 读取角色信息
                var roleIds = await QueryNoTracking<UserRole>()
                    .Where(p => p.UserId == userId)
                    .Select(p => p.RoleId)
                    .ToListAsync();
                // 读取权限信息
                var permissionIds = await QueryNoTracking<RolePermission>()
                    .Include(p => p.Permission)
                    .Where(p => p.Permission.PermissionType == PermissionType.Menu) // 读取菜单的
                    .Where(p => roleIds.Contains(p.RoleId)) // 角色Id过滤
                    .Select(p => p.PermissionId)
                    .ToListAsync();
                // 根据权限读取菜单Id数据
                var result = await QueryNoTracking<PermissionMenu>()
                    .Include(p => p.Menu)
                    .Where(p => permissionIds.Contains(p.PermissionId))
                    .Select(p => p.Menu)
                    .ToListAsync();
                if (result.Count == 0)
                {
                    rsp.Message = "暂无数据.";
                    return rsp;
                }
                // 使用菜单ID分组，用于过滤重复数据
                result = result.GroupBy(p => p.Id).Select(p => p.FirstOrDefault()).ToList();

                // 读取上级Id
                var parentIds = result
                    .Where(p => !string.IsNullOrEmpty(p.ParentId)) // 读取上级Id非空的
                    .GroupBy(p => p.ParentId) // 按上级Id分组，用于过滤重复的ID
                    .Select(p => p.FirstOrDefault()?.ParentId)
                    .ToList();
                // 如果找到数据
                if (parentIds.Count > 0)
                {
                    // 和result对比，过滤掉已经存在的
                    var arrIds = parentIds.Where(id => result.All(p => p.Id != id)).ToList();
                    // 如果找到
                    if (arrIds.Count > 0)
                    {
                        // 读取
                        var r = await query.Where(p => arrIds.Contains(p.Id)).ToListAsync();
                        if (r.Count > 0)
                        {
                            result.AddRange(r);
                        }
                    }
                }

                var data = new List<GetMenusResponse>();
                GetTreeChildren(result.OrderBy(p => p.Sort).ToList(), data);
                rsp.Message = "读取成功.";
                rsp.Data = data;
                rsp.Success = true;
                return rsp;
            });
        }
        #region Private Methods
        private void GetTreeChildren(IList<Menu> entitys, IList<GetMenusResponse> results, string parentId = null)
        {
            IList<Menu> result = null;
            if (string.IsNullOrEmpty(parentId))
            {
                result = entitys.Where(p => string.IsNullOrEmpty(p.ParentId)).ToList();
            }
            else
            {
                result = entitys.Where(p => p.ParentId == parentId).ToList();
            }
            foreach (var t1 in result)
            {
                var res = new GetMenusResponse
                {
                    Id = t1.Id,
                    ParentId = t1.ParentId,
                    Title = t1.Name,
                    Value = t1.Id,
                    Key = t1.Id,
                    Name = t1.Name,
                    Path = t1.Path,
                    Sort = t1.Sort,
                    Status = t1.Status,
                    Level = t1.Level,
                    CreatedOn = t1.CreatedOn,
                    UpdatedOn = t1.UpdatedOn,
                    IsInside = t1.IsInside
                };
                if (entitys.Any(p => p.ParentId == t1.Id))
                {
                    res.Children = new List<GetMenusResponse>();
                    GetTreeChildren(entitys, res.Children, t1.Id);
                }
                results.Add(res);
            }
        }
        #endregion
    }
}