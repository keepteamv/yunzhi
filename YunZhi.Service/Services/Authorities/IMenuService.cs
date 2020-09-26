using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities.Requests.Menus;
using YunZhi.Service.Services.Authorities.Responses.Menus;

namespace YunZhi.Service.Services.Authorities
{
    public interface IMenuService
    {
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> InsertAsync(InsertMenuRequest request);
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> UpdateAsync(UpdateMenuRequest request);
        /// <summary>
        /// 读取分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<Page<Menu>>> GetPagesAsync(GetMenuPagesRequest request);
        /// <summary>
        /// 读取树形数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<IList<GetMenusResponse>>> GetTreeListAsync();
        /// <summary>
        /// 根据角色Id读取菜单Id列表
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        Task<ApiResult<IList<string>>> GetMenuIdsByRoleIdAsync(string roleId);
        /// <summary>
        /// 根据用户Id读取菜单列表
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<ApiResult<IList<GetMenusResponse>>> GetTreeListByUserIdAsync(string userId);
    }
}
