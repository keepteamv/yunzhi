using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using YunZhi.WebAPI.Authentications;
using YunZhi.WebAPI.Extensions;

namespace YunZhi.WebAPI.Controllers
{
    [EnableCors]
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    [APIAuthorizeFilter]
    public class YunZhiControllerBase : ControllerBase
    {
        /// <summary>
        /// 读取当前登录用户ID
        /// </summary>
        protected string UserId
        {
            get
            {
                try
                {
                    var token = HttpContext.GetHeader("Authorization");
                    var result = new JwtSecurityToken(token.Split(' ')[1]);
                    var uuid = result.Claims.FirstOrDefault(p => p.Type == ClaimTypes.NameIdentifier)?.Value;
                    return uuid;
                }
                catch (System.Exception)
                {
                    throw new System.Exception("读取当前用户ID失败,请重新登录后重试.");
                }
            }
        }
    }
}