using System;
using YunZhi.Service.Infrastructure.Configs;

namespace YunZhi.Service.Infrastructure
{
    public static class ConfigSettings
    {
        /// <summary>
        /// Redis Config
        /// </summary>
        public static RedisConfig RedisConfig { get; set; } = new RedisConfig();
    }
}
