using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Infrastructure.Attributes;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities;
using YunZhi.Service.Services.Authorities.Requests;
using YunZhi.Service.Services.Authorities.Requests.Menus;
using YunZhi.Service.Services.Authorities.Responses.Menus;

namespace YunZhi.WebAPI.Controllers.Authorities
{
    /// <summary>
    /// 用户控制器
    /// </summary>
    public class MenuController : YunZhiControllerBase
    {
        private readonly IMenuService _menuService;
        public MenuController(IMenuService menuService)
        {
            _menuService = menuService;
        }
        /// <summary>
        /// 查询分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("getPages")]
        [Permission("authority.getpages.menu")]
        public async Task<ApiResult<Page<Menu>>> GetPages([FromBody] GetMenuPagesRequest request)
        {
            return await _menuService.GetPagesAsync(request);
        }

        /// <summary>
        /// 查询树形数据
        /// </summary>
        /// <returns></returns>
        [HttpGet("getTreeList")]
        [Permission("authority.gettreelist.menu")]
        public async Task<ApiResult<IList<GetMenusResponse>>> GetTreeList()
        {
            return await _menuService.GetTreeListAsync();
        }
        /// <summary>
        /// 根据角色Id读取菜单Id列表
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        [HttpGet("getMenuIdsByRoleId")]
        [Permission("authority.getmenuidsbyroleid.menu")]
        public async Task<ApiResult<IList<int>>> GetMenuIdsByRoleId(int roleId)
        {
            return await _menuService.GetMenuIdsByRoleIdAsync(roleId);
        }
        /// <summary>
        /// 根据用户Id读取菜单列表
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("getTreeListByUserId")]
        [Permission("authority.gettreelistbyuserid.menu")]
        public async Task<ApiResult<IList<GetMenusResponse>>> GetTreeListByUserId(int userId)
        {
            return await _menuService.GetTreeListByUserIdAsync(userId);
        }
        /// <summary>
        /// 创建
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("create")]
        [Permission("authority.create.menu")]
        public async Task<ApiResult<string>> Create([FromBody] InsertMenuRequest request)
        {
            return await _menuService.InsertAsync(request);
        }
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("update")]
        [Permission("authority.update.menu")]
        public async Task<ApiResult<string>> Update([FromBody] UpdateMenuRequest request)
        {
            return await _menuService.UpdateAsync(request);
        }
    }
}