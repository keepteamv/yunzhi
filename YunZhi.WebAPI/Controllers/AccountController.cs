using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Infrastructure.Services;
using YunZhi.Service.Services.Authorities;
using YunZhi.Service.Services.Authorities.Requests.Users;
using YunZhi.WebAPI.Services;

namespace YunZhi.WebAPI.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IOperationService _operationService;
        private readonly TokenManagement _tokenManagement;
        private readonly RedisService _redisService;
        public AccountController(
            IUserService userService,
            IOptions<TokenManagement> tokenManagement,
            IOperationService operationService,
            RedisService redisService)
        {
            _userService = userService;
            _tokenManagement = tokenManagement.Value;
            _operationService = operationService;
            _redisService = redisService;
        }
        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("login")]
        public async Task<ApiResult<dynamic>> Login([FromBody] LoginRequest request)
        {
            var rsp = new ApiResult<dynamic>();
            if (!ModelState.IsValid)
            {
                rsp.StatusCode = 400;
                rsp.Message = "Invalid Request";
                return rsp;
            }

            var res = await _userService.LoginAsync(request);
            if (!res.Success)
            {
                rsp.Message = res.Message;
                rsp.StatusCode = res.StatusCode;
                return rsp;
            }

            var info = res.Data;
            if (!PasswordHash.PasswordHash.ValidatePassword(request.Password, info.Password))
            {
                rsp.Message = "用户名或密码错误！";
                return rsp;
            }
            // 读取用户操作权限
            var operationResult = await _operationService.GetOperationnCodesByUserIdAsync(info.Id);
            // 如果存在数据
            if (operationResult.Success)
            {
                // 保存到缓存
                await _redisService.StringSetAsync<IList<string>>(info.Id, operationResult.Data);
            }
            var token = Jwt.Create(_tokenManagement, info);
            rsp.Message = "登录成功";
            rsp.Success = true;
            rsp.Data = new
            {
                uuid = info.Id,
                name = info.RealName,
                token = "Bearer " + token,
                permissions = operationResult.Success ? operationResult.Data : new List<string>()
            };
            return rsp;
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
    }
}