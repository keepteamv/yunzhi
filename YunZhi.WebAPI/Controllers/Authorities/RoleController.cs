using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Infrastructure.Attributes;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities;
using YunZhi.Service.Services.Authorities.Requests.Roles;

namespace YunZhi.WebAPI.Controllers.Authorities
{
    public class RoleController : YunZhiControllerBase
    {
        private readonly IRoleService _roleService;
        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }
        /// <summary>
        /// 查询分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("getPages")]
        [Permission("authority.getpages.role")]
        public async Task<ApiResult<Page<Role>>> GetPages([FromBody] GetRolePagesRequest request)
        {
            return await _roleService.GetPagesAsync(request);
        }

        /// <summary>
        /// 创建
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("create")]
        [Permission("authority.create.role")]
        public async Task<ApiResult<string>> Create([FromBody] InsertRoleRequest request)
        {
            return await _roleService.InsertAsync(request);
        }
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("update")]
        [Permission("authority.update.role")]
        public async Task<ApiResult<string>> Update([FromBody] UpdateRoleRequest request)
        {
            return await _roleService.UpdateAsync(request);
        }
        /// <summary>
        /// 保存角色组与角色关联信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("saveRoleGroupRole")]
        [Permission("authority.saverolegrouprole.role")]
        public async Task<ApiResult<string>> SaveRoleGroupRole([FromBody] SaveRoleGroupRoleRequest request)
        {
            return await _roleService.SaveRoleGroupRoleAsync(request);
        }
        /// <summary>
        /// 根据用户ID读取角色ID
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("getIdsByUserId")]
        [Permission("authority.getidsbyuserid.role")]
        public async Task<ApiResult<IList<string>>> GetIdsByUserId(string userId)
        {
            return await _roleService.GetIdsByUserIdAsync(userId);
        }
        /// <summary>
        /// 查询数据列表
        /// </summary>
        /// <returns></returns>
        [HttpGet("getList")]
        [Permission("authority.getlist.role")]
        public async Task<ApiResult<IList<Role>>> GetList()
        {
            return await _roleService.GetListAsync();
        }
    }
}