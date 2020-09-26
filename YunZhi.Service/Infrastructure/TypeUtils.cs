using System;
using System.Linq;
using YunZhi.Service.Infrastructure.Attributes;

namespace YunZhi.Service.Infrastructure
{
    public class TypeUtils
    {
        /// <summary>
        /// Check whether a type is a component type.
        /// </summary>
        public static bool IsComponent(Type type)
        {
            return type.IsClass && !type.IsAbstract && type.GetCustomAttributes(typeof(ComponentAttribute), false).Any();
        }
    }
}
