using System.ComponentModel.DataAnnotations;

namespace YunZhi.Service.Services.Authorities.Requests.Users
{
    /// <summary>
    /// 登录请求类
    /// </summary>
    public class LoginRequest
    {
        /// <summary>
        /// 用户名
        /// </summary>
        [Required]
        public string UserName { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        [Required]
        public string Password { get; set; }
    }
}