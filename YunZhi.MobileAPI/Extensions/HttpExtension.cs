using System.Linq;
using System.Web;
using Microsoft.AspNetCore.Http;

namespace PanasonicInspect.MobileAPI.Extensions
{
    
    public static class HttpExtension
    {
        /// <summary>
        /// 获取请求头内容
        /// </summary>
        /// <param name="ctx">当前请求上下文</param>
        /// <param name="key">KEY</param>
        /// <returns></returns>
        public static string GetHeader(this HttpContext ctx, string key)
        {
            string value = string.Empty;

            var iValue = ctx.Request.Headers[key];
            if (iValue.Count > 0)
            {
                value = HttpUtility.UrlDecode(iValue.FirstOrDefault());
            }
            return value;
        }
        /// <summary>
        /// 获取IP地址
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public static string GetIPAddress(this HttpContext context)
        {
            return context.Request.Headers["X-Real-IP"];
        }
    }
}