using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities;
using YunZhi.Service.Services.Authorities.Requests;
using YunZhi.Service.Services.Authorities.Requests.Users;
using YunZhi.Service.Services.Authorities.Responses.Users;

namespace YunZhi.MobileAPI.Controllers.Authorities
{
    /// <summary>
    /// 用户控制器
    /// </summary>
    public class UserController : YunZhiControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        /// <summary>
        /// 查询分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("getPages")]
        public async Task<ApiResult<Page<User>>> GetPages([FromBody] GetUserPagesRequest request)
        {
            return await _userService.GetPagesAsync(request);
        }

        /// <summary>
        /// 创建
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("create")]
        public async Task<ApiResult<string>> Create([FromBody] InsertUserRequest request)
        {
            // 密码加密
            request.Password = PasswordHash.PasswordHash.CreateHash(request.Password);
            return await _userService.InsertAsync(request);
        }
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("update")]
        public async Task<ApiResult<string>> Update([FromBody] UpdateUserRequest request)
        {
            if (!string.IsNullOrEmpty(request.Password))
            {
                // 密码加密
                request.Password = PasswordHash.PasswordHash.CreateHash(request.Password);
            }
            return await _userService.UpdateAsync(request);
        }
    }
}