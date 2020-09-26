using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Microsoft.Extensions.DependencyInjection;
using YunZhi.Service.Infrastructure;

namespace YunZhi.WebAPI.Extensions
{
    public static class IocServiceExtensions
    {
        /// <summary>
        /// Register all the business components from the given assemblies.
        /// </summary>
        public static IServiceCollection RegisterBusinessComponents(this IServiceCollection services, params Assembly[] assemblies)
        {
            var registeredTypes = new List<Type>();
            foreach (var assembly in assemblies)
            {
                foreach (var type in assembly.GetTypes().Where(TypeUtils.IsComponent))
                {
                    if (!registeredTypes.Contains(type))
                    {
                        foreach (var interfaceType in type.GetInterfaces())
                        {
                            services.AddScoped(interfaceType, type);
                        }
                    }
                }
            }
            return services;
        }
    }
}
