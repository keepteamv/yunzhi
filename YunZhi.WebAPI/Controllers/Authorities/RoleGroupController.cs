using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Infrastructure.Attributes;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities;
using YunZhi.Service.Services.Authorities.Requests.RoleGroups;

namespace YunZhi.WebAPI.Controllers.Authorities
{
    public class RoleGroupController : YunZhiControllerBase
    {
        private readonly IRoleGroupService _roleGroupService;
        public RoleGroupController(IRoleGroupService roleGroupService)
        {
            _roleGroupService = roleGroupService;
        }
        /// <summary>
        /// 查询分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("getPages")]
        [Permission("authority.getpages.rolegroup")]
        public async Task<ApiResult<Page<RoleGroup>>> GetPages([FromBody] GetRoleGroupPagesRequest request)
        {
            return await _roleGroupService.GetPagesAsync(request);
        }
        /// <summary>
        /// 查询数据列表
        /// </summary>
        /// <returns></returns>
        [HttpGet("getList")]
        [Permission("authority.getlist.rolegroup")]
        public async Task<ApiResult<IList<RoleGroup>>> GetList()
        {
            return await _roleGroupService.GetListAsync();
        }
        /// <summary>
        /// 创建
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("create")]
        [Permission("authority.create.rolegroup")]
        public async Task<ApiResult<string>> Create([FromBody] InsertRoleGroupRequest request)
        {
            return await _roleGroupService.InsertAsync(request);
        }
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("update")]
        [Permission("authority.update.rolegroup")]
        public async Task<ApiResult<string>> Update([FromBody] UpdateRoleGroupRequest request)
        {
            return await _roleGroupService.UpdateAsync(request);
        }
        /// <summary>
        /// 根据角色ID读取组ID
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        [HttpGet("getIdsByRoleId")]
        [Permission("authority.getidsbyroleid.rolegroup")]
        public async Task<ApiResult<IList<string>>> GetIdsByRoleId(string roleId)
        {
            return await _roleGroupService.GetIdsByRoleIdAsync(roleId);
        }
    }
}