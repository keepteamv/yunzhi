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
        [Permission("webapi.get.role")]
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
        [Permission("webapi.create.role")]
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
        [Permission("webapi.update.role")]
        public async Task<ApiResult<string>> Update([FromBody] UpdateRoleRequest request)
        {
            return await _roleService.UpdateAsync(request);
        }
    }
}