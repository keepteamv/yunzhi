using Microsoft.AspNetCore.Builder;
using YunZhi.WebAPI.Middlewares;

namespace YunZhi.WebAPI.Extensions
{
    public static class ErrorHandlingExtensions
    {
        public static IApplicationBuilder UseErrorHandling(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ErrorHandlingMiddleware>();
        }
    }
}
