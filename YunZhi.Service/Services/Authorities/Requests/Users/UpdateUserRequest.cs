namespace YunZhi.Service.Services.Authorities.Requests.Users
{
    /// <summary>
    /// 更新用户信息请求类
    /// </summary>
    public class UpdateUserRequest
    {
        /// <summary>
        /// ID
        /// </summary>
        public string Id { get; set; }
        /// <summary>
        /// 真实姓名
        /// </summary>
        public string RealName { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        public string Password { get; set; }
        /// <summary>
        /// 手机号
        /// </summary>
        public string PhoneNumber { get; set; }
    }
}