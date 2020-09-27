using System.Collections.Generic;
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Linq;
using System.Security.Claims;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using YunZhi.Service.Infrastructure.Attributes;
using YunZhi.Service.Infrastructure;
using Microsoft.AspNetCore.Mvc.Controllers;
using YunZhi.Service.Infrastructure.Services;

namespace YunZhi.WebAPI.Authentications
{
    /// <summary>
    /// API权限验证过滤器
    /// </summary>
    public class APIAuthorizeFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            try
            {
                // 通过反射读取特性Permission，用于验证是否有访问对应Action的权限
                var controllerActionDescriptor = context.ActionDescriptor as ControllerActionDescriptor;
                var actionAttributes = controllerActionDescriptor?.MethodInfo?.GetCustomAttributes(inherit: true);
                var info = actionAttributes?.FirstOrDefault(p => p.GetType() == typeof(PermissionAttribute)) as PermissionAttribute;
                // 如果没有标记，直接验证通过
                if (info == null || info.Permissions.Count() == 0)
                {
                    base.OnActionExecuting(context);
                    return;
                }
                // 读取jwt token
                var token = GetAuthorization(context.HttpContext);
                // 反序列化jwt
                var result = new JwtSecurityToken(token.Split(' ')[1]);
                // 读取用户ID
                var userId = result.Claims.FirstOrDefault(p => p.Type == ClaimTypes.NameIdentifier)?.Value;
                // 实例化redis服务
                var redisService = new RedisService();
                // 读取用户拥有的权限
                var permissions = redisService.StringGet<IList<string>>(userId);

                // 与特性标记的对比,如果不存在,则验证失败
                if (permissions == null || !permissions.Any(tag => info.Permissions.Contains(tag)))
                {
                    context.Result = new JsonResult(new ApiResult<string>
                    {
                        StatusCode = 403,
                        Message = "无操作权限,请联系管理员."
                    });
                }
                base.OnActionExecuting(context);
            }
            catch (Exception ex)
            {
                context.Result = new JsonResult(new ApiResult<string>
                {
                    StatusCode = 500,
                    Message = "读取token失败，错误：" + ex.Message
                });
                base.OnActionExecuting(context);
            }
        }
        /// <summary>
        /// GET Authorization
        /// </summary>
        /// <param name="ctx"></param>
        /// <returns></returns>
        private string GetAuthorization(HttpContext ctx)
        {
            string value = string.Empty;

            var iValue = ctx.Request.Headers["Authorization"];
            if (iValue.Count > 0)
            {
                value = HttpUtility.UrlDecode(iValue.FirstOrDefault());
            }
            return value;
        }
    }
}
