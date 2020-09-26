using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PanasonicInspect.Service.Infrastructure;
using PanasonicInspect.Service.Services.Authorities;
using PanasonicInspect.Service.Services.Authorities.Requests;
using PanasonicInspect.Services;

namespace PanasonicInspect.Controllers
{
    [EnableCors]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly TokenManagement _tokenManagement;
        public AccountController(IUserService userService, IOptions<TokenManagement> tokenManagement)
        {
            _userService = userService;
            _tokenManagement = tokenManagement.Value;
        }
        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [AllowAnonymous]
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
                rsp.Message = "用户名或密码错误！";
                return rsp;
            }

            var info = res.Data;
            if (!PasswordHash.PasswordHash.ValidatePassword(request.Password, info.Password))
            {
                rsp.Message = "用户名或密码错误！";
                return rsp;
            }

            var token = Jwt.Create(_tokenManagement,info);
            rsp.Message = "登录成功";
            rsp.Success = true;
            rsp.Data = new
            {
                uuid=info.Id,
                name=info.RealName,
                token="Bearer " + token
            } ;
            return rsp;
        }
        
        
    }
}