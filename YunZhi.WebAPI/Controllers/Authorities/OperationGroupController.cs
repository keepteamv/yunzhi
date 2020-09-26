using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Infrastructure.Attributes;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities;
using YunZhi.Service.Services.Authorities.Requests.UserGroups;

namespace YunZhi.WebAPI.Controllers.Authorities
{
    public class UserGroupController : YunZhiControllerBase
    {
        private readonly IUserGroupService _userGroupService;
        public UserGroupController(IUserGroupService userGroupService)
        {
            _userGroupService = userGroupService;
        }
        /// <summary>
        /// 查询分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("getPages")]
        [Permission("webapi.getpages.usergroup")]
        public async Task<ApiResult<Page<UserGroup>>> GetPages([FromBody] GetUserGroupPagesRequest request)
        {
            return await _userGroupService.GetPagesAsync(request);
        }
        /// <summary>
        /// 查询分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpGet("getList")]
        [Permission("webapi.getlist.usergroup")]
        public async Task<ApiResult<IList<UserGroup>>> GetList()
        {
            return await _userGroupService.GetListAsync();
        }
        /// <summary>
        /// 创建
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("create")]
        [Permission("webapi.create.usergroup")]
        public async Task<ApiResult<string>> Create([FromBody] InsertUserGroupRequest request)
        {
            return await _userGroupService.InsertAsync(request);
        }
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("update")]
        [Permission("webapi.update.usergroup")]
        public async Task<ApiResult<string>> Update([FromBody] UpdateUserGroupRequest request)
        {
            return await _userGroupService.UpdateAsync(request);
        }
    }
}