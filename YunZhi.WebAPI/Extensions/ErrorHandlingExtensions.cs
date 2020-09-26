using Microsoft.AspNetCore.Builder;
using PanasonicInspect.Middlewares;

namespace PanasonicInspect.Extensions
{
    public static class ErrorHandlingExtensions
    {
        public static IApplicationBuilder UseErrorHandling(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ErrorHandlingMiddleware>();
        }
    }
}
