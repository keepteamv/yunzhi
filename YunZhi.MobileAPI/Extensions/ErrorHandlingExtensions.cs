using Microsoft.AspNetCore.Builder;
using PanasonicInspect.MobileAPI.Middlewares;

namespace PanasonicInspect.MobileAPI.Extensions
{
    public static class ErrorHandlingExtensions
    {
        public static IApplicationBuilder UseErrorHandling(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ErrorHandlingMiddleware>();
        }
    }
}
