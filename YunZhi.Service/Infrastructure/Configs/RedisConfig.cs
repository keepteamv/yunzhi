using System;

namespace YunZhi.Service.Infrastructure.Configs
{
    /// <summary>
    /// Redis 配置
    /// </summary>
    public class RedisConfig
    {
        /// <summary>
        /// 地址
        /// </summary>
        public string Address { get; set; } = "127.0.0.1";
        /// <summary>
        /// 端口
        /// </summary>
        public string Port { get; set; } = "6379";
        /// <summary>
        /// 密码
        /// </summary>
        public string Password { get; set; }

        public RedisConfig() { }

        public RedisConfig(string address, string port, string password)
        {
            Address = address;
            Port = port;
            Password = password;
        }
    }
}
