using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Infrastructure.Attributes;
using YunZhi.Service.Infrastructure.Services;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities;
using YunZhi.Service.Services.Authorities.Requests.Permissions;

namespace YunZhi.WebAPI.Controllers.Authorities
{
    public class PermissionController : YunZhiControllerBase
    {
        private readonly IPermissionService _permissionService;
        private readonly IOperationService _operationService;
        private readonly RedisService _redisService;
        public PermissionController(
            IPermissionService permissionService,
            IOperationService operationService,
            RedisService redisService)
        {
            _permissionService = permissionService;
            _operationService = operationService;
            _redisService = redisService;
        }
        /// <summary>
        /// 保存权限菜单
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("savePermissionMenu")]
        [Permission("authority.savepermissionmenu.permission")]
        public async Task<ApiResult<string>> SavePermissionMenu([FromBody] SavePermissionMenuRequest request)
        {
            return await _permissionService.SavePermissionMenuAsync(request);
        }
        /// <summary>
        /// 保存权限操作
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("savePermissionOperation")]
        [Permission("authority.savepermissionoperation.permission")]
        public async Task<ApiResult<string>> SavePermissionOperation([FromBody] SavePermissionOperationRequest request)
        {
            return await _permissionService.SavePermissionOperationAsync(request);
        }
        /// <summary>
        /// 读取当前用户拥有的权限
        /// </summary>
        /// <returns></returns>
        [HttpGet("getPermissions")]
        [Permission("authority.getpermissions.permission")]
        public async Task<ApiResult<IList<string>>> GetPermissions()
        {
            var res = await _operationService.GetOperationnCodesByUserIdAsync(UserId);
            if (res.Success)
            {
                // 更新缓存
                await _redisService.StringSetAsync<IList<string>>(UserId, res.Data);
            }
            return res;
        }
    }
}