using Microsoft.AspNetCore.Builder;
using YunZhi.MobileAPI.Middlewares;

namespace YunZhi.MobileAPI.Extensions
{
    public static class ErrorHandlingExtensions
    {
        public static IApplicationBuilder UseErrorHandling(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ErrorHandlingMiddleware>();
        }
    }
}
